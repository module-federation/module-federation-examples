import React, { lazy, useEffect, useState } from 'react';
import {registerRemotes, loadRemote} from "@module-federation/runtime";

function loadComponent(scope, module) {
  return async () => {
    if(!scope && !module) {
      return {default: ()=>null}
    }
    return await loadRemote(scope  + module.replace('.',''));
  };
}

const componentCache = new Map();
export const useFederatedComponent = (remoteUrl, scope, module) => {
  console.log(remoteUrl,scope, module);
  if(scope && remoteUrl) {
    registerRemotes([
      {
        name: scope,
        entry: remoteUrl,
      },
    ]);
  }
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (Component) setComponent(null);
    // Only recalculate when key changes
  }, [key]);

  useEffect(() => {
    if (!Component) {
      const Comp = lazy(loadComponent(scope, module));
      componentCache.set(key, Comp);
      setComponent(Comp);
    }
    // key includes all dependencies (scope/module)
  }, [Component, key]);

  return { Component };
};

export default useFederatedComponent;
