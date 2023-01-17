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
import { collectUniqueItemsByProperties, groupBy } from './object-util';

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
 * Reads 
 */
export function readProjectConsumeModules(
  graph: ProjectGraph,
  rootPath: string,
  projectName: string,
  metadata: NFPDashboardExecutorMetadataOptions
): NFPDashboardConsumeModule[] {
  const NATIVE_FEDERATION_PACKAGE = '@softarc/native-federation';
  const NATIVE_FEDERATION_FUNCTION = 'loadRemoteModule';
  const MODULE_PATTERN = /\.(js|mjs|jsx|ts|tsx)$/;

  const project: ProjectGraphProjectNode = graph.nodes[projectName];

  if (project.type !== 'app') {
    return [];
  }

  const modules = [] as NFPDashboardConsumeModule[];
  let nativeFederationOptions = [] as (LoadRemoteModuleOptions & { file: string })[];

  const moduleFiles: FileData[] = project.data.files
    .filter((file) => {
      return file.file.startsWith(project.data.sourceRoot) && MODULE_PATTERN.test(file.file);
    });

  for (const moduleFile of moduleFiles) {
    const modulePath = path.join(rootPath, moduleFile.file);

    if (!existsSync(modulePath)) {
      continue;
    }

    const moduleJavascript: string = readFileSync(modulePath).toString('utf-8');
    const moduleAst: SourceFile = createSourceFile('', moduleJavascript, ScriptTarget.Latest, true);

    const moduleImports = findNodes(moduleAst, SyntaxKind.ImportDeclaration) as ImportDeclaration[];
    const hasNativeFederationImport = moduleImports.some(
      (nativeImport) => {
        return nativeImport.moduleSpecifier.getText().includes(NATIVE_FEDERATION_PACKAGE);
      });

    if (!hasNativeFederationImport) {
      continue;
    }
    
    const moduleExpressions = findNodes(moduleAst, SyntaxKind.CallExpression) as CallExpression[];
    const nativeFederationInvokes: CallExpression[] = moduleExpressions
      .filter((node) => node.expression.getText() === NATIVE_FEDERATION_FUNCTION);

    if (nativeFederationInvokes.length < 1) {
      continue;
    }

    try {
      nativeFederationOptions = [...nativeFederationOptions, ...nativeFederationInvokes
        .map((node) => {
          return node.arguments.map((node) => node.getText());
        })
        .flatMap((options: string[]) => {
          const nativeFederationParsings = options[0]
            .split(',')
            .map((options) => options.trim())
            .join(',')
            .replace(/,\}/, '}')
            .replace(/\n|\r|\t| /gi, '')
            .replace(/'|"/gi, '')
            .replace('{', '')
            .replace('}', '');
          
          const nativeFederationSplits = nativeFederationParsings.split(',');
          const nativeFederationModules = {} as LoadRemoteModuleOptions & { file: string };

          nativeFederationSplits.forEach((options) => {
            const nativeFederationSplits = options.split(':');
            nativeFederationModules[nativeFederationSplits[0]] = path.basename(nativeFederationSplits[1]);
          });

          nativeFederationModules.file = moduleFile.file;
          return nativeFederationModules;
        })
      ];
    } catch (e) {
      throw new Error(`Error occurred while scanning file for consuming modules: ${e}`)
    }
  }

  const nativeFederationOptionsUniques = collectUniqueItemsByProperties(
    nativeFederationOptions, 
    ['remoteName', 'exposedModule', 'file']
  );

  const nativeFederationOptionsGrouped: { [key: string]: (LoadRemoteModuleOptions & { file: string; })[] } 
    = groupBy(nativeFederationOptionsUniques, 'remoteName');

  const url = metadata.source.url;
  const projectRootPath = project.data.root;

  for(const nativeFederationRemoteName of Object.keys(nativeFederationOptionsGrouped)) {
    let module = {} as NFPDashboardConsumeModule;

    for (const nativeFederationRemote of nativeFederationOptionsGrouped[nativeFederationRemoteName]) {
      if (module.name !== nativeFederationRemote.exposedModule) {
        module = {
          consumingApplicationID: projectName,
          applicationID: nativeFederationRemoteName,
          name: nativeFederationRemote.exposedModule,
          usedIn: module.usedIn || []
        };
      }

      const moduleCleanPath = nativeFederationRemote.file.replace(new RegExp(projectRootPath), '');

      module.usedIn.push({
        file: moduleCleanPath,
        url: path.join(url, moduleCleanPath)
      });
    }

    modules.push(module);
  }

  return modules;
}