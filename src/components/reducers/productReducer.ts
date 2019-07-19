import { IProductState } from "./states.interface";
import { IProductActions } from "../actions/actions.interfaces";
import { EProductActions } from "../actions/actions.enums";

const initialState: IProductState = {
  items: [],
  loading: false,
  error: null
};

export default function productReducer(
  state = initialState,
  action: IProductActions
) {
  switch (action.type) {
    case EProductActions.FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case EProductActions.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.products
      };

    case EProductActions.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}
