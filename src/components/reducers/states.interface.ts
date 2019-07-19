import { IProduct } from "../../data/Data.interfaces";

export declare interface ICartState {
  items: (IProduct & {
    quantity?: number;
  })[];
  addedItems: (IProduct & {
    quantity?: number;
  })[];
  total: number;
}
export declare interface IProductState {
  items: IProduct[];
  loading: boolean;
  error: any;
}
