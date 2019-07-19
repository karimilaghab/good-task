import { EProductActions } from "./actions.enums";
import { IProduct } from "../../data/Data.interfaces";

export const fetchProducts = (items: IProduct[]) => ({
  type: EProductActions.FETCH_PRODUCTS,
  payload: { items }
});