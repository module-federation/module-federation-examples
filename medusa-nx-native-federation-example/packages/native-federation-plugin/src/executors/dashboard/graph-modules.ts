import * as path from 'path';
import { existsSync, readFileSync } from 'fs';
import {
  createSourceFile,
  CallExpression,
  ScriptTarget,
  SyntaxKind,
  SourceFile,
  ImportDeclaration
} from 'typescript';
import {
  normalizePath,
  FileData,
  ProjectGraph,
  ProjectGraphProjectNode
} from '@nrwl/devkit';
import { findNodes } from 'nx/src/utils/typescript';
import { LoadRemoteModuleOptions } from '@softarc/native-federation';
import {
  NFPDashboardConsumeModule,
  NFPDashboardModule,
  NFPDashboardExecutorMetadataOptions
} from './schema';
import { filterUniqueItemsBy } from './object-util';

/**
 * Reads a project exposed modules from `federation.config.js`
 */
export async function readProjectExposedModules(
  graph: ProjectGraph,
  rootPath: string,
  projectName: string
): Promise<NFPDashboardModule[]> {
  const projectGraph: ProjectGraphProjectNode = graph.nodes[projectName];
  const projectPath: string = projectGraph.data.root;
  let projectFederationConfig: { exposes: {[key: string]: string} };

  try {
    projectFederationConfig = await import(path.join(rootPath, `${projectPath}/federation.config.js`)) || {};
  } catch (e) {
    throw new Error(`Error occurred while reading exposed modules: ${e}`);
  }

  const moduleExposes: [string, string][] = Object.entries(projectFederationConfig.exposes || {});
  const modules: NFPDashboardModule[] = [];

  for (const [module, modulePath] of moduleExposes) {
    const file: FileData = projectGraph.data.files.find((file) => {
      return file.file.startsWith(modulePath);
    });

    if (!file) {
      continue;
    }

    const moduleName: string = path.basename(module);

    const moduleRequires: string[] = file.deps?.filter((name) => name.startsWith('npm:'))
      .map((name) => name.replace('npm:', ''));

    modules.push({
      id: `${projectName}:${moduleName}`,
      name: moduleName,
      file: file.file,
      requires: moduleRequires,
      applicationID: projectName,
    });
  }

  return modules;
}

/**
 * Collects a project remote modules which consume the Native Module Federation
 */
function parseNativeFederationModules(
  rootPath: string,
  project: ProjectGraphProjectNode
): (LoadRemoteModuleOptions & { file: string; })[] {
  const NATIVE_FEDERATION_PACKAGE = '@softarc/native-federation';
  const NATIVE_FEDERATION_FUNCTION = 'loadRemoteModule';
  const MODULE_PATTERN = /\.(js|mjs|jsx|ts|tsx)$/;

  // scan a project Javascript files
  const moduleFiles: FileData[] = project.data.files
    .filter((file) => {
      return file.file.startsWith(project.data.sourceRoot) && MODULE_PATTERN.test(file.file);
    });

  let nativeFederationRemotes = [] as (LoadRemoteModuleOptions & { file: string })[];

  // detect a project modules which use Native Module Federation
  for (const moduleFile of moduleFiles) {
    const modulePath = path.join(rootPath, moduleFile.file);

    if (!existsSync(modulePath)) {
      continue;
    }

    // read and build module AST tree
    const moduleJavascript: string = readFileSync(modulePath).toString('utf-8');
    const moduleAst: SourceFile = createSourceFile('', moduleJavascript, ScriptTarget.Latest, true);
    const moduleImports = findNodes(moduleAst, SyntaxKind.ImportDeclaration) as ImportDeclaration[];

    // detect if we have the NMF import declaration
    const hasNativeFederationImport = moduleImports
      .some((nativeImport) => {
        return nativeImport.moduleSpecifier.getText().includes(NATIVE_FEDERATION_PACKAGE);
      });

    if (!hasNativeFederationImport) {
      continue;
    }

    // walk through the module tree and seek for NFM function call expressions
    const moduleExpressions = findNodes(moduleAst, SyntaxKind.CallExpression) as CallExpression[];
    const nativeFederationInvokes: CallExpression[] = moduleExpressions
      .filter((node) => {
        return node.expression.getText() === NATIVE_FEDERATION_FUNCTION;
      });

    if (nativeFederationInvokes.length < 1) {
      continue;
    }

    // parse the arguments of NFM function call expressions
    try {
      // merge all found modules into the list
      nativeFederationRemotes = [...nativeFederationRemotes, ...nativeFederationInvokes
        .map((node) => {
          return node.arguments.map((node) => node.getText());
        })
        /** parse the string:
         * `{
         *   remoteName: 'dsl',
         *   exposedModule: "./TextField",
         *   remoteEntry: 'http://localhost:3002/remoteEntry.json'
         * }`
         * into json object
         */
        .flatMap((options: string[]) => {
          const parsingsRegex = RegExp('((remoteName|exposedModule)[ ]*:.*)', 'g');
          const splitsResult: string[] = [];
          let parsingsResult: RegExpExecArray | null;

          // extract all options
          while ((parsingsResult = parsingsRegex.exec(options[0])) !== null) {
            // remove extra characters
            splitsResult.push(parsingsResult[1].replace(/'|"| |,/gi, ''));
          }

          const nativeFederationModules = {} as LoadRemoteModuleOptions & { file: string };

          // normalize options into key => value format
          splitsResult.forEach((options) => {
            const splitsResult = options.split(':');
            nativeFederationModules[splitsResult[0]] = path.basename(splitsResult[1]);
          });

          nativeFederationModules.file = moduleFile.file;
          return nativeFederationModules;
        })
      ];
    } catch (e) {
      throw new Error(`Error occurred while scanning file for consuming modules: ${e}`)
    }
  }

  return nativeFederationRemotes;
}

/**
 * Reads a project consumed remote modules
 */
export function readProjectConsumedModules(
  graph: ProjectGraph,
  rootPath: string,
  projectName: string,
  metadata: NFPDashboardExecutorMetadataOptions
): NFPDashboardConsumeModule[] {
  const project: ProjectGraphProjectNode = graph.nodes[projectName];

  if (project.type !== 'app') {
    return [];
  }

  const nativeFederationRemotes:
    (LoadRemoteModuleOptions & { file: string; })[] = parseNativeFederationModules(rootPath, project);

  // prevent NFP function call duplications
  const nativeFederationUniqueRemotes = filterUniqueItemsBy(nativeFederationRemotes, [
    'remoteName', 'exposedModule', 'file'
  ]);

  const url: string = metadata.source.url;
  const projectRootPath: string = project.data.root;
  const modules = [] as NFPDashboardConsumeModule[];

  // serialize and group modules by the same module
  for (const { remoteName, exposedModule, file } of nativeFederationUniqueRemotes){
    const module: NFPDashboardConsumeModule = modules
      .find((module) => {
        return module?.applicationID === remoteName && module?.name === exposedModule;
      });

    const moduleCleanPath: string = file.replace(new RegExp(projectRootPath), '');

    if (!module) {
      modules.push({
        consumingApplicationID: projectName,
        applicationID: remoteName,
        name: exposedModule,
        usedIn: [{
          file: moduleCleanPath,
          url: normalizePath(path.join(url, moduleCleanPath))
        }]
      });

      continue;
    }

    module.usedIn.push({
      file: moduleCleanPath,
      url: normalizePath(path.join(url, moduleCleanPath))
    });
  }

  return modules;
}
