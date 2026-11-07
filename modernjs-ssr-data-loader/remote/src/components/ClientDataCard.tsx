import DataCard from './DataCard';
import type { DataCardData } from './DataCard.data';

export default function ClientDataCard({ mfData }: { mfData?: DataCardData }) {
  return <DataCard mfData={mfData} />;
}
