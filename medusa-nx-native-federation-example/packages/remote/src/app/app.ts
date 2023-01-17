import { format, parseISO } from 'date-fns';
import { isLongWeekend } from './is-long-weekend';

import { loadRemoteModule } from '@softarc/native-federation';

const reactAppMod = loadRemoteModule({
  remoteName: 'remote',
  exposedModule: './react-remote'
});

const reactAppMod2 = loadRemoteModule({
  remoteName: 'button-remote',
  exposedModule: './button'
});

const isoDate = '2023-01-01';
const date = parseISO(isoDate);
const weekday = format(date, 'EEE');
console.log(`${isoDate} is a ${weekday}.`);

if (isLongWeekend(date)) {
  console.log('Long weekend 😎');
} else {
  console.log('No long weekend ☹');
}
