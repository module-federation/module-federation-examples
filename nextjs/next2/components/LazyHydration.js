import React from "react";
const isBrowser = process.browser;
const useIsomorphicLayoutEffect = isBrowser
  ? React.useLayoutEffect
  : React.useEffect;
export const handleFederation = async (remoteImport) => {
  const split = remoteImport.split("/");
  const [scope] = split.splice(0, 1);
  const request = split.join("/");
  if (!process.browser) {
    const container = await __webpack_require__(
      `webpack/container/reference/${scope}`
    ).next1;
    return await container.get("./" + request).then((factory) => {
      const Module = factory();
      return {
        __esModule: true,
        request: remoteImport,
        ...Module,
      };
    });
  } else {
    try {
      return await window.next1.get("./" + request).then((factory) => {
        const Module = factory();
        return {
          __esModule: true,
          ...Module,
        };
      });
    } catch (e) {
      console.log(e);
    }
  }
};

const LazyHydrate = function (props) {
  const childRef = React.useRef(null);

  // Always render on server
  const [hydrated, setHydrated] = React.useState(!isBrowser);
  const [remoteReady, setRemoteStatus] = React.useState(!isBrowser);

  const {
    // federation = true,
    ssrOnly,
    whenIdle,
    whenVisible,
    on = [],
    children,
    remote,
    ...rest
  } = props;
  React.useEffect(() => {
    const check = async () => {
      const remoteImport = props.remote;
      const split = remoteImport.split("/");
      const [scope] = split.splice(0, 1);
      const request = split.join("/");

      window[scope].get(`./${request}`).then((factory) => {
        factory();
        ssrOnly ? null : setHydrated(true);
      });
    };
    check();
  }, []);

  if (
    process.env.NODE_ENV &&
    !ssrOnly &&
    !whenIdle &&
    !whenVisible &&
    !on.length &&
    !remote
  ) {
    console.error(
      `LazyHydration: Enable atleast one trigger for hydration.\n` +
        `If you don't want to hydrate, use ssrOnly`
    );
  }

  useIsomorphicLayoutEffect(() => {
    // No SSR Content
    if (!childRef.current.hasChildNodes()) {
      setHydrated(true);
    }
  }, []);

  React.useEffect(() => {
    if (ssrOnly || hydrated) return;
    const cleanupFns = [];
    function cleanup() {
      while (cleanupFns.length) {
        cleanupFns.pop()();
      }
    }
    function hydrate() {
      setHydrated(true);
    }

    if (whenIdle) {
      if (requestIdleCallback) {
        const idleCallbackId = requestIdleCallback(hydrate, { timeout: 500 });
        cleanupFns.push(() => {
          cancelIdleCallback(idleCallbackId);
        });
      } else {
        const id = setTimeout(hydrate, 2000);
        cleanupFns.push(() => {
          clearTimeout(id);
        });
      }
    }

    let events = Array.isArray(on) ? on.slice() : [on];

    events.forEach((event) => {
      childRef.current.addEventListener(event, hydrate, {
        once: true,
        capture: true,
        passive: true,
      });
      cleanupFns.push(() => {
        childRef.current.removeEventListener(event, hydrate, { capture: true });
      });
    });

    return cleanup;
  }, [hydrated, on, ssrOnly, whenIdle, whenVisible]);

  if (hydrated) {
    return (
      <div ref={childRef} style={{ display: "contents" }} {...rest}>
        {children}
      </div>
    );
  } else {
    return (
      <div
        ref={childRef}
        style={{ display: "contents" }}
        suppressHydrationWarning
        {...rest}
        dangerouslySetInnerHTML={{ __html: "" }}
      />
    );
  }
};

export default LazyHydrate;
