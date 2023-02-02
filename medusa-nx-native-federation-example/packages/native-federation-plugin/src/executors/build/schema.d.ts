// eslint-disable-line
export interface NFPBuildExecutorOptions {
  outputPath: string;
  index: string;
  main: string;
  assets: string[];
}

//
export interface NFPWorkspacePaths {
  executorTargetPath: string;
  workspaceRootPath: string;
  workspaceDistPath: string;
  workspaceTsConfigPath: string;
  projectName: string;
  projectPath: string;
  projectSrcPath: string;
  projectEntryPath: string;
  projectIndexHtml: string;
  projectAssets: string[];
  projectFederationConfigPath: string;
}
