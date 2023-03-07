import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { ProductList, fetchProducts } from '../components/ProductList';

const StyledPage = styled.div`
  min-height: calc(100vh - 16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  padding: 15px;
  border: 4px dashed ${(props) => props.color || 'orangered'};
  border-radius: 0.25rem;
`;

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  const limit = query?.limit ? +query.limit : 10;
  const skip = query?.skip ? +query.skip : 0;

  const products = await fetchProducts({ limit, skip });

  await queryClient.prefetchQuery(['products', limit, skip], () => products, {
    initialData: products,
    staleTime: 5000, // data will be considered stale after 5 seconds
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export interface PageProps {
  color?: string;
}

// note that products data are not extracted from the page props
export function Page(props?: PageProps) {
  const router = useRouter();

  const limit = router.query.limit ? +router.query.limit : 10;
  const skip = router.query.skip ? +router.query.skip : 0;

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage color={props?.color}>
      <ProductList limit={limit} skip={skip} />
    </StyledPage>
  );
}

export default Page;
