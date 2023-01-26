// eslint-disable-line
export interface NFPBuildExecutorOptions {
  entryFile: string;
  outputPath: string;
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
  projectFederationConfigPath: string;
}
