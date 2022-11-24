// Please use dotenv
const { readFileSync } = require('fs');
const { resolve } = require('path');

function readEnvs() {
    return readFileSync(resolve(__dirname, '.env'))
        .toString('utf-8')
        .trim()
        .split('\n')
        .map(v => v.trim().split('='))
        .reduce((acc, [k, v]) => { acc[k] = v; return acc; }, {});
}

module.exports = readEnvs;