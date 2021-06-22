import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CatchAll = ({ Page, ...props }) => {
  const [lazyProps, setProps] = useState({});
  useEffect(async () => {
    if (props.pageName) {
      const federatedProps = await CatchAll.getInitialProps(props);
      setProps({ ...federatedProps });
    }
  }, []);
  let RemoteComponent = Page || lazyProps.Page;

  if (!process.browser || !RemoteComponent) return null;

  const componentProps = Object.assign({}, lazyProps, props);

  return (
    <>
      <RemoteComponent {...componentProps} />
    </>
  );
};
CatchAll.getInitialProps = async ({ err, req, res, AppTree, ...props }) => {
  const pageName = `./${props.query.slug}`;
  if (process.browser) {
    console.log("getting Exposed Module", pageName);
    try {
      await window.next1.init(__webpack_share_scopes___.default);
    } catch {
      // swollow error
    }
    const page = await window.next1.get(pageName).then((factory) => {
      const Module = factory();
      return Module;
    });

    const federatedProps = await page.default.getInitialProps(props);
    return { ...federatedProps, Page: page.default };
  }
  return { pageName, ...props };
};
export default CatchAll;
