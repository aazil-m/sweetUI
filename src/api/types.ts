export type Id = number | string;

export type Sweet = {
  id: Id;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

export type SearchParams = {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};
