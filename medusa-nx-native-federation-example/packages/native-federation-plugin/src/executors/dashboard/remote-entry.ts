import * as path from 'path';
import { existsSync } from 'fs';
import { readJsonFile, writeJsonFile } from '@nrwl/devkit';
import { NFPDashboardFederationRemoteEntryFile } from './schema';

/**
 *
 */
export function writeRemoteEntryVersionFile(directory: string, version: string): void {
  const remoteEntryJsonFile: string = path.join(directory, `./remoteEntry.json`);
  const remoteEntryJson: NFPDashboardFederationRemoteEntryFile = (
    existsSync(remoteEntryJsonFile) ? readJsonFile(remoteEntryJsonFile) || {} : {}
  ) as NFPDashboardFederationRemoteEntryFile;

  remoteEntryJson.shared = (remoteEntryJson?.shared || []).map((dependency) => {
    return {
      ...dependency,
      outFileName: path.join(version, dependency.outFileName)
    };
  });

  remoteEntryJson.exposes = (remoteEntryJson?.exposes || []).map((dependency) => {
    return {
      ...dependency,
      outFileName: './' + path.join(version, dependency.outFileName)
    };
  });

  writeJsonFile(remoteEntryJsonFile, remoteEntryJson);
}