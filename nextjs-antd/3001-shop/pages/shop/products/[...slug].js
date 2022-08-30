import { useRouter } from 'next/router';

export default function ProductPage() {
  const { query } = useRouter();
  return <h1>Product with id {query?.slug}!!!</h1>;
}
