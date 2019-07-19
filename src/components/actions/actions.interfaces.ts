import { ECartActions, EProductActions } from "./actions.enums";
import { IProduct } from "../../data/Data.interfaces";

export interface ICartActions {
	type: ECartActions;
	id: number;
}
export interface IProductActions {
	type: EProductActions;
	payload: {
		items: IProduct[];
		products: IProduct[];
		error: any
	};
}