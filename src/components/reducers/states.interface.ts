import { IProduct } from "../../data/Data.interfaces";

export declare interface ICartState {
  items: IProduct[];
  addedItems: (IProduct & {
    quantity: number;
  })[];
  total: number;
}
export declare interface IProductState {
  items: IProduct[];
  loading: boolean;
  error: any;
}
