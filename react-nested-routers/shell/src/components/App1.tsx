import React, { useEffect, useRef } from 'react';
import { mount } from 'app1/App1Index';
import { app1RoutingPrefix, shellBrowserHistory } from '../routing/constants';
import { useNavigate } from 'react-router-dom';

const app1Basename = `/${app1RoutingPrefix}`;

export default () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to navigation events dispatched inside app2 mfe.
    const app2NavigationEventHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const newPathname = `${app1Basename}${pathname}`;
      if (newPathname === shellBrowserHistory.location.pathname) {
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener('[app1] navigated', app2NavigationEventHandler);

    // Listen to navigation events in shell app to notifify app1 mfe.
    const unlistenHistoryChanges = shellBrowserHistory.listen(({ location }) => {
      if (location.pathname.startsWith(app1Basename)) {
        window.dispatchEvent(
          new CustomEvent('[shell] navigated', {
            detail: location.pathname.replace(app1Basename, ''),
          }),
        );
      }
    });

    mount({
      mountPoint: wrapperRef.current!,
      initialPathname: shellBrowserHistory.location.pathname.replace(app1Basename, ''),
    });

    return () => {
      window.removeEventListener('[app1] navigated', app2NavigationEventHandler);
      unlistenHistoryChanges();
    };
  }, []);

  return <div ref={wrapperRef} />;
};
