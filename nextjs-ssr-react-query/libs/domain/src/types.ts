export type Cursor = {
  limit: number;
  skip: number;
};

export type PaginatedReponse<T, Key extends string> = {
  [key in Key]: T[];
} & {
  total: number;
  skip: number;
  limit: number;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
