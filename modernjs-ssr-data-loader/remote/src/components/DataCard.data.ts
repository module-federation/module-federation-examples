export type DataCardData = {
  message: string;
  requestMarker: string;
};

export async function fetchData(): Promise<DataCardData> {
  return {
    message: 'Remote loader data from the provider',
    requestMarker: crypto.randomUUID(),
  };
}
