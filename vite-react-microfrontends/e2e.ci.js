const concurrently = require('concurrently');
const commands = {
    startHost: 'yarn serve:host',
    startRemote: 'yarn serve:remote',
    startE2e: 'yarn e2e:test'
};

const {result} = concurrently([
    commands.startHost,
    commands.startRemote,
    commands.startE2e
], {
    killOthers: ['failure', 'success'],
});

function handleClose(exitInfo) {
    const testResult = exitInfo.find(info => info.command.command === commands.startE2e);
    process.exit(testResult.exitCode);
}

result.then(handleClose, handleClose);
