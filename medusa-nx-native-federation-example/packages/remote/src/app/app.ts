import React from 'react';
import { format, parseISO } from 'date-fns';
import { isLongWeekend } from './is-long-weekend';

import { initFederation, loadRemoteModule } from '@softarc/native-federation';

(async () => {
  await initFederation({
    "utils": "http://localhost:3005/remoteEntry.json"
  });

  const a: any = await loadRemoteModule({
    remoteName: "utils",
    exposedModule: "./analytics",
  });

  console.log(a.sendAnalyticsMessage(11111));
})();

const isoDate = '2023-01-01';
const date = parseISO(isoDate);
const weekday = format(date, 'EEE');
console.log(`${isoDate} is a ${weekday}.`);

if (isLongWeekend(date)) {
  console.log('Long weekend 😎');
} else {
  console.log('No long weekend ☹');
}
