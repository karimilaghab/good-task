import items from "../../data/Data.json";
import { IProduct } from "../../data/Data.interfaces";
import { ICartState } from "./states.interface";
import { ICartActions } from "../actions/actions.interfaces";
import { ECartActions } from "../actions/actions.enums";

const myitems: IProduct[] = items.products;
const initState: ICartState = {
  items: myitems,
  addedItems: [],
  total: 0
};

const cartReducer = (state = initState, action: ICartActions) => {
  if (action.type === ECartActions.ADD_TO_CART) {
    const addedItem = state.items.find(item => item._source.id === action.id);
    // check if the action id exists in the addedItems
    const existedItem = state.addedItems.find(
      item => action.id === item._source.id
    );
    if (existedItem && addedItem) {
      addedItem.quantity = (addedItem.quantity || 0) + 1;
      return {
        ...state,
        total: state.total + addedItem._source.giftprice
      };
    } else if (addedItem) {
      addedItem.quantity = 1;
      // calculating the total
      const newTotal = state.total + addedItem._source.giftprice;

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal
      };
    }
  }
  if (action.type === ECartActions.REMOVE_ITEM) {
    const itemToRemove = state.addedItems.find(
      item => action.id === item._source.id
    );

    if (itemToRemove) {
      const newTotal =
        state.total -
        itemToRemove._source.giftprice * (itemToRemove.quantity || 0);
      const addedItems = state.addedItems.filter(
        item => action.id !== item._source.id
      );
      // calculating the total
      console.log(itemToRemove);
      return {
        ...state,
        addedItems,
        total: newTotal
      };
    }
  }
  // INSIDE CART COMPONENT
  if (action.type === ECartActions.ADD_QUANTITY) {
    const addedItem = state.items.find(item => item._source.id === action.id);
    if (addedItem) {
      addedItem.quantity = (addedItem.quantity || 0) + 1;
      const newTotal = state.total + addedItem._source.giftprice;
      return {
        ...state,
        total: newTotal
      };
    }
  }
  if (action.type === ECartActions.SUB_QUANTITY) {
    const addedItem = state.items.find(item => item._source.id === action.id);
    // if the qt == 0 then it should be removed
    if (addedItem && addedItem.quantity === 1) {
      const addedItems = state.addedItems.filter(
        item => item._source.id !== action.id
      );
      const newTotal = state.total - addedItem._source.giftprice;
      return {
        ...state,
        addedItems,
        total: newTotal
      };
    } else if (addedItem) {
      addedItem.quantity = (addedItem.quantity || 0) - 1;
      const newTotal = state.total - addedItem._source.giftprice;
      return {
        ...state,
        total: newTotal
      };
    }
  }

  return state;
};

export default cartReducer;
