import dynamic from 'next/dynamic';
const Page = dynamic(
  async () => {
    return import('../async-pages/index');
  },
  {
    ssr: false,
  },
);
export default function Home() {
  return <Page />;
}
