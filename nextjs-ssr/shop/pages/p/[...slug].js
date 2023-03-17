import { useRouter } from 'next/router'

export default function PDP() {
  const router = useRouter()
  const { slug } = router.query
  return <h1>PDP!!! slug: {slug}</h1>;
}
PDP.getInitialProps = async () => {
  return {};
};
