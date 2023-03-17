import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link, { LinkProps } from 'next/link';
import styled from 'styled-components';

import type { Product } from '@acme/domain';

const Button = dynamic(
  () => import('button/Button').then((mod) => mod.Button),
  {
    ssr: true,
  }
);

export const CardOutline = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 0.25rem;
  border: 4px dashed royalblue;
`;

export const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PriceArea = styled.div`
  height: 100%;
`;

export interface ProductCardProps extends LinkProps {
  product: Product;
}

export function ProductCard({ product, ...linkProps }: ProductCardProps) {
  return (
    <CardOutline>
      <CardBody>
        <Link {...linkProps}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={200}
            height={100}
            style={{
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
            priority
          />
          <h4>{product.title}</h4>
          <p>{product.brand}</p>
          <div>
            <span>price: {product.price}</span>{' '}
            <span>rating: {product.rating}</span>
          </div>
        </Link>
      </CardBody>

      <Button onClick={() => alert('You bought a product')}>Buy Now</Button>
    </CardOutline>
  );
}
