import { ECartActions } from "./actions.enums";

// add cart action
export const addToCart = (id: number) => {
  return {
    type: ECartActions.ADD_TO_CART,
    id
  };
};
// remove item action
export const removeItem = (id: number) => {
  return {
    type: ECartActions.REMOVE_ITEM,
    id
  };
};
// subtract qt action
export const subtractQuantity = (id: number) => {
  return {
    type: ECartActions.SUB_QUANTITY,
    id
  };
};
// add qt action
export const addQuantity = (id: number) => {
  return {
    type: ECartActions.ADD_QUANTITY,
    id
  };
};