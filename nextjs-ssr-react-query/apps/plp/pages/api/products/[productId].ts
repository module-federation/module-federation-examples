import type { NextApiRequest, NextApiResponse } from 'next';

import type { Product } from '@acme/domain';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const productId = String(req.query.productId);

  const apiResponse = await fetch(
    `https://dummyjson.com/products/${productId}`
  );

  if (!apiResponse.ok) {
    res
      .status(404)
      .json({ message: `Product with id '${productId}' not found` });
    return;
  }

  const product = (await apiResponse.json()) as Product;

  res.status(200).json(product);
};

export default handler;
