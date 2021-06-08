import { useRouter } from "next/router";
import React from "react";

const CatchAll = ({ Page, ...props }) => {
  console.log(props);
  const router = useRouter();
  const slug = router.query.slug || [];
  if (!process.browser || !Page) return <h1>Slug: {slug.join("/")}</h1>;
  return (
    <>
      <Page {...props} />
    </>
  );
};
CatchAll.getInitialProps = async (props) => {
  const pageName = `./${props.query.slug}Page`;
  if (process.browser) {
    console.log("getting Exposed Module", pageName);

    const page = await window.next1.get(pageName).then((factory) => {
      const Module = factory();
      return Module;
    });

    const federatedProps = await page.default.getInitialProps(props);
    return { ...federatedProps, Page: page.default };
  }
  return {};
};
export default CatchAll;
