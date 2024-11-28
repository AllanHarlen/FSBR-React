import { Category } from "./Category";

export interface Product {
    id?: number;
    name: string;
    price: number;
    categoryid?: number;
    category?: Category;
  }