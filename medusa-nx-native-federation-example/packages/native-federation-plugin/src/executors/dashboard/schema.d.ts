// Options to provide for target `:dashboard` executor in `project.json`
export interface NFPDashboardExecutorOptions {
  buildTarget: string;
  environment: string;
  tokenFile: string;
  versionStrategy: string;
  filename: string;
  writeUrl: string;
  readUrl: string;
  metadata: NFPDashboardExecutorMetadataOptions;
}

//
export interface NFPDashboardOptions {
  buildTarget: string;
  name: string;
  rootPath: string,
  outputPath: string;
  filename: string;
  versionStrategy: string;
  environment: string;
  metadata: NFPDashboardExecutorMetadataOptions;
}

//
export interface NFPDashboardOutputFile {
  id: string;
  name: string;
  remote: string;
  version: string;
  sha: string;
  buildHash: string;
  environment: string;
  metadata: NFPDashboardExecutorMetadataOptions;
  dependencies: NFPDashboardDependency[];
  devDependencies: NFPDashboardDependency[];
  optionalDependencies: NFPDashboardDependency[],
  overrides: NFPDashboardOverrideModule[];
  modules: NFPDashboardModule[];
  consumes: NFPDashboardConsumeModule[];
}

//
export interface NFPDashboardExecutorMetadataOptions {
  baseUrl: string;
  source: {
    url: string;
  };
  remote: string,
}

//
export interface NFPDashboardDependency {
  name: string;
  version: string;
  license?: string;
  size?: number;
}

//
export interface NFPDashboardModule {
  id: string;
  name: string;
  file: string;
  requires: string[];
  applicationID: string;
}

//
export interface NFPDashboardConsumeModule {
  consumingApplicationID: string;
  applicationID: string;
  name: string;
  usedIn: NFPDashboardConsumeUsedInFile[];
}

//
export interface NFPDashboardConsumeUsedInFile {
  file: string;
  url: string;
}

//
export interface NFPDashboardOverrideModule {
  id: string;
  name: string;
  version: string;
  location: string;
  applicationID: string;
}

//
export interface NFPDashboardToken {
  DASHBOARD_READ_TOKEN: string;
  DASHBOARD_WRITE_TOKEN: string;
  DASHBOARD_BASE_URL: string;
  ENVIRONMENT?: string;
}

//
export interface NFPDashboardFederationRemoteEntryFile {
  shared: { outFileName: string }[];
  exposes: { outFileName: string }[];
}

//
export type NFPDashboardVersionStrategy = 'Date' | 'GitSha' | 'BuildHash';