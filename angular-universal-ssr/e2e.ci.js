const concurrently = require('concurrently');
const commands = {
    startHost: 'yarn start',
    startE2e: 'wait-on http://localhost:4000 && yarn e2e:test'
};

const {result} = concurrently([
    commands.startHost,
    commands.startE2e
], {
    killOthers: ['failure', 'success'],
});

function handleClose(exitInfo) {
    const testResult = exitInfo.find(info => info.command.command === commands.startE2e);
    process.exit(testResult.exitCode);
}

result.then(handleClose, handleClose);
