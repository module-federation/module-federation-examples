import type { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const Header = dynamic(
  () => import('header/Header').then((mod) => mod.Header),
  {
    ssr: true,
  }
);

const Button = dynamic(
  () => import('button/Button').then((mod) => mod.Button),
  {
    ssr: true,
  }
);

const PlpProductsPage = dynamic(
  () => import('plp/ProductsPage').then((mod) => mod.Page),
  {
    ssr: true,
  }
);

const StyledPage = styled.div`
  align-items: center;
  margin: 15px;
  padding: 15px;
  border: 4px dashed orangered;
  border-radius: 0.25rem;
`;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const page = await import('plp/ProductsPage');

  if (page.getServerSideProps) {
    return page.getServerSideProps(context);
  }

  return {
    props: {},
  };
}

export function Page() {
  return (
    <StyledPage>
      <Header>
        <Button onClick={() => alert('You clicked on a header button')}>
          Hello Button
        </Button>
      </Header>

      <PlpProductsPage color="forestgreen" />
    </StyledPage>
  );
}

export default Page;
