import dynamic from "next/dynamic";
const page = import("../../async-pages/shop/mybag");

const Page = dynamic(() => import("../../async-pages/shop/mybag"));
Page.getInitialProps = async (ctx) => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;
