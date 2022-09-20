import dynamic from 'next/dynamic';
const page = import('../async-pages/checkout');

const Page = dynamic(() => import('../async-pages/checkout'));
export const getServerSideProps = async ctx => {
  const getServerSideProps = (await page).getServerSideProps
  if (getServerSideProps) {
    return getServerSideProps(ctx);
  }
  return {};
};
export default Page;
