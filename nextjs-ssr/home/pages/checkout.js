import dynamic from 'next/dynamic';

const Page = dynamic(() => import('checkout/checkout'));

export const getServerSideProps = async ctx => {
  const page = import('checkout/checkout');
  const getServerSideProps = (await page).getServerSideProps;
  if (getServerSideProps) {
    return getServerSideProps(ctx);
  }
  return {};
};
export default Page;
