/* eslint-disable consistent-return */

import virtual from '@rollup/plugin-virtual';
import { walk } from 'estree-walker';
import MagicString from 'magic-string';

/** @typedef {{ [key:string]: string }} FederatedRemotes */

/**
 * @typedef {object} FederationOptions
 * @property {FederatedRemotes} remotes
 * @property {{ [package: string]: string }} shared
 */

/**
 * Plugin which enables consumption of Federated Modules.
 * @param {FederationOptions} options
 */
export default function federation(options) {
  const sourceMap = typeof options.sourceMap !== 'undefined' ? options.sourceMap : true;
  const providedRemotes = options.remotes || {};
  /** @type {Array<{ id: string, config: any }>} */
  const remotes = [];
  Object.keys(providedRemotes).forEach(id => {
    remotes.push(Object.assign({}, { id, config: providedRemotes[id] }));
  });
  const shared = options.shared || {};

  const eagerShared = Object.entries(shared).filter(
    ([_, version]) => typeof version === 'object' && version.eager,
  );
  const virtualMod = virtual({
    __federation__: `${eagerShared
      .map(([toShare, version], idx) => `import eager${idx} from ${JSON.stringify(toShare)}`)
      .join('\n')}
const remotesMap = {
  ${remotes
    .map(
      remote =>
        `${JSON.stringify(remote.id)}: () => System.import(${JSON.stringify(remote.config)})`,
    )
    .join(',\n  ')}
};

const processModule = (mod) => {
  if (mod && mod.__useDefault) {
    return mod.default;
  }

  return mod;
}

const shareScope = {
  ${Object.entries(shared)
    .map(
      ([toShare, version]) => `${JSON.stringify(toShare)}: {
				
    ${
      typeof version === 'object' && version.eager
        ? `get: () => () => processModule(${`eager${eagerShared.findIndex(
            e => e[0] === toShare,
          )}`}),`
        : `get: () => System.import(${JSON.stringify(toShare)}).then(r => () => processModule(r)),`
    }
    loaded: ${JSON.stringify((typeof version === 'object' && version.eager) || false)},
    singleton: ${JSON.stringify((typeof version === 'object' && version.singleton) || false)},
    version: ${JSON.stringify(
      ((typeof version === 'object' && version.requiredVersion) || version)
        .split('.')
        .reduce((p, c) => {
          const parsed = Number.parseInt(c.replace(/\D/g, ''), 10);
          if (Number.isSafeInteger(parsed)) {
            p.push(parsed);
          }
          return p;
        }, []),
    )}
  }`,
    )
    .join(',\n  ')}
};

const initMap = {};

export default {
  ensure: async (remoteId) => {
    const remote = await remotesMap[remoteId]();

//     if (!initMap[remoteId]) {
// 	console.log(remote)
//         remote.init(shareScope);
//       initMap[remoteId] = true;
//     }

    return remote;
  }
};`,
  });

  return {
    name: 'federation',

    resolveId(...args) {
      const v = virtualMod.resolveId.call(this, ...args);
      if (v) {
        return v;
      }
      return null;
    },

    load(...args) {
      const v = virtualMod.load.call(this, ...args);
      if (v) {
        return v;
      }
    },

    transform(code) {
      let ast = null;
      try {
        ast = this.parse(code);
      } catch (err) {
        // bypass
      }
      if (!ast) {
        return null;
      }

      const magicString = new MagicString(code);
      let requiresRuntime = false;
      walk(ast, {
        enter(node) {
          if (node.type === 'ImportExpression') {
            if (node.source && node.source.value) {
              const moduleId = node.source.value;
              const remote = remotes.find(r => moduleId.startsWith(r.id));

              if (remote) {
                requiresRuntime = true;
                const modName = `.${moduleId.slice(remote.id.length)}`;

                magicString.overwrite(
                  node.start,
                  node.end,
                  `__federation__.ensure(${JSON.stringify(
                    remote.id,
                  )}).then((remote) => remote.get(${JSON.stringify(
                    modName,
                  )})).then((factory) => factory())`,
                );
              }
            }
          }
        },
      });

      if (requiresRuntime) {
        magicString.prepend(`import __federation__ from '__federation__';\n\n`);
      }

      return {
        code: magicString.toString(),
        map: sourceMap ? magicString.generateMap({ hires: true }) : null,
      };
    },
  };
}
