export default function () {
    return {
        name: 'remote-router',
        errorLoadRemote({id, error, from, origin}) {
            console.error(id, 'offline');
            const pg = function () {
                console.error(id, 'offline', error);
                return `remote ${id} is offline`;
            };

            let mod;
            if (from === 'build') {
                mod = () => ({
                    __esModule: true,
                    default: pg,
                });
            } else {
                mod = {
                    default: pg,
                };
            }

            return mod;
        },
        init(args) {
            return args;
        },
        beforeRequest(args) {
            console.log('before request', args);
            args.options.remotes.forEach((r) => {
                const name = r.name
                if (name === 'remote_one') {
                    r.entry = 'http://localhost:4200/remoteEntry.js'
                }
                if (name === 'remote_two') {
                    r.entry = 'http://localhost:4201/remoteEntry.js'
                }
            })
            return args;
        },
    };
}
