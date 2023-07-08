interface NFPRemote {
  version: string;
  remoteURL: string;
}

interface NFPRemoteErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

const jsonHeaders = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
}

/**
 *
 */
export async function loadRemoteEntryVersions(url: string): Promise<{ [key: string]: string | null }> {
  const remotes: { [key: string]: string } = await window.fetch(url, jsonHeaders)
    .then((r) => r.json()) || {};

  const versionsJson: { [key: string]: string | null } = {};

  for (const remote of Object.keys(remotes)) {
    const endpoint: string = remotes[remote];
    let version: NFPRemote | NFPRemoteErrorResponse;

    try {
      version = await window.fetch(endpoint, jsonHeaders)
        .then((r) => r.json());

      if ((version as NFPRemoteErrorResponse).error) {
        versionsJson[remote] = null;
        continue;
      }
    } catch(e) {
      versionsJson[remote] = null;
      continue;
    }

    version = version as NFPRemote;
    versionsJson[remote] = `${version.remoteURL}/version-${version.version}/remoteEntry.json`;
  }

  return versionsJson;
}

/**
 *
 */
export function loadRemoteEntryVersionsMemo(url: string): () => Promise<{ [key: string]: string; }> {
  let remotes: {[key: string]: string | null;};

  return async (): Promise<{ [key: string]: string; }> => {
    if (!remotes) {
      remotes = await loadRemoteEntryVersions(url) || {};
      return remotes;
    }

    return remotes;
  }
}
