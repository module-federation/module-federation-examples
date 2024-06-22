const getRemote = () => {
  return {
    name: 'get-remote-from-window-plugin',
    beforeRequest: args => {
      // The 'beforeRequest' hook is called before a request is made.
      // It iterates over each 'remote' in 'args.options.remotes'.
      args.options.remotes.forEach(remote => {
        // Constructing the reference name from the remote's name.
        const refName = `${remote.name}Url`;
        console.log(refName);
        // Checking if the global variable corresponding to 'refName' exists.
        if (typeof window[refName] !== 'undefined') {
          // Splitting the 'remote.entry' string on the pattern '[window.anyVariableName]'
          // and taking the part after this pattern.
          const split = remote.entry.split(/\[window\.[^\]]+]/)[1];
          // If there's a string after the split (i.e., the pattern was found),
          // prepend the value of the global variable to this string.
          if (split) {
            remote.entry = window[refName] + split;
          }
        }
      });
      return args;
    },
  };
};

export default getRemote;
