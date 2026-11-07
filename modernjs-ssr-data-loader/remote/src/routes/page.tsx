import { useLoaderData } from '@modern-js/runtime/router';
import DataCard from '../components/DataCard';
import type { DataCardData } from '../components/DataCard.data';

export default function Page() {
  const data = useLoaderData() as DataCardData;
  return <DataCard mfData={data} />;
}
