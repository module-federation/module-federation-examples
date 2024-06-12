export default function () {
  return {
    name: 'single-runtime-plugin',
    init(args) {
      const hostName = __FEDERATION__.__INSTANCES__[0].name
     if(args.options.name !== hostName) {
       const hostsRemote = args.options.remotes.find((remote)=>{
         return remote.name === hostName || remote.alias === hostName
       })
       if(!hostsRemote) return args

       hostsRemote.entry = hostsRemote.entry.replace('remoteEntry', hostName + '_partial')

       console.log('hostsRemote',hostsRemote)
     }
     console.log(args);
      return args
    },
  };
}
