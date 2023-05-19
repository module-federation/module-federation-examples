import type { GetStaticPropsContext } from 'next';
import styled from 'styled-components';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
  ProductOverview,
  fetchProductById,
} from '../../components/ProductOverview';

const StyledPage = styled.div`
  min-height: calc(100vh - 16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  padding: 5px;
  border: 4px dashed orangered;
  border-radius: 0.25rem;
`;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const queryClient = new QueryClient();

  const { productId } = params;

  await queryClient.prefetchQuery(
    ['product', productId],
    () => fetchProductById(productId as string),
    {
      staleTime: 5000, // will give 5 seconds for all queries to be fetched, before the page is rendered, if the data is not already processed by the time the page is rendered with the pre-fetched data
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60, // will revalidate the page every hour
  };
}

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      <ProductOverview />
    </StyledPage>
  );
}

export default Index;
