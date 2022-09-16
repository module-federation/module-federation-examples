import { loadRemoteModule } from '@softarc/native-federation';
import { format, parseISO } from 'date-fns';
import { RemoteType } from './remote-type';
import './bootstrap';

const isoDate = '2023-01-01';
const date = parseISO(isoDate);
const weekday = format(date, 'EEE');
console.log(`${isoDate} is a ${weekday}.`);

(async () => {
  console.log('loading remote module ...');
  const m = await loadRemoteModule<RemoteType>({
    remoteName: 'remote',
    exposedModule: './module',
  });

  console.log('got remote module: ', m);

  if (m.isLongWeekend(date)) {
    console.log('Long weekend 😎');
  } else {
    console.log('No long weekend ☹');
  }
})();
