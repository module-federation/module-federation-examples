import fetch from 'node-fetch';

export function fetchCircuits() {
  return fetch('https://ergast.com/api/f1/2018/circuits.json')
    .then(res => res.json())
    .then(res => res.MRData.CircuitTable.Circuits);
}
