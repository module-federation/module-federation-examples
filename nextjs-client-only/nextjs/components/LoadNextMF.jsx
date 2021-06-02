import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

async function loadModule(scope, module) {
  await __webpack_init_sharing__("default");
  const container = window[scope];
  await container.init(__webpack_share_scopes__.default);
  const factory = await window[scope].get(module);
  const Module = factory();
  return Module;
}

function MountMF({ mount }) {
  const ref = useRef();
  const router = useRouter();

  useEffect(() => {
    const { unmount } = mount(ref.current, {
      onNavigate: (pathname) => {
        if (router.pathname !== pathname) {
          router.push(pathname, undefined, {
            shallow: true,
          });
        }
      },
    });

    return unmount;
  }, [ref.current]);

  return <div ref={ref} />;
}

function useDynamicScript({ url }) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement("script");

    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => setReady(true);

    element.onerror = () => {
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
}

export default React.memo(function LoadNextMF({
  url,
  module,
  scope,
  errorComponent: ErrorComponent = () => "There was an error",
  loadingComponent: LoadingComponent = () => "...",
}) {
  if (typeof window === "undefined") return <LoadingComponent />;

  const { ready: scriptReady, failed: scriptFailed } = useDynamicScript({
    url,
  });
  const [mount, setMount] = useState();
  const [moduleFailed, setModuleFailed] = useState(false);

  useEffect(() => {
    scriptReady &&
      loadModule(scope, module)
        .then(({ default: mountFn }) =>  setMount(() => mountFn))
        .catch(() => setModuleFailed(true));
  }, [scriptReady, module, scope]);

  if (mount) {
    return <MountMF mount={mount} />;
  } else if (scriptFailed || moduleFailed) {
    return <ErrorComponent />;
  } else {
    return <LoadingComponent />;
  }
});
