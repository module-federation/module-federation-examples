import { useState } from 'react';
import type { DataCardData } from './DataCard.data';

export default function DataCard({ mfData }: { mfData?: DataCardData }) {
  const [count, setCount] = useState(0);

  return (
    <section aria-label="Remote data card">
      <h2 data-testid="remote-message">{mfData?.message ?? 'Missing remote data'}</h2>
      <p data-testid="request-marker">{mfData?.requestMarker}</p>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </section>
  );
}
