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
    const newState = {
      items: [...state.items],
      addedItems: [...state.addedItems],
      total: state.total
    };
    const foundItem = newState.items.find(
      item => item._source.id === action.id
    );
    // check if the action id exists in the addedItems
    const existedItem = newState.addedItems.find(
      item => action.id === item._source.id
    );
    if (existedItem && foundItem) {
      existedItem.quantity = existedItem.quantity + 1;
      newState.total = state.total + foundItem._source.giftprice;

      return newState;
    } else if (foundItem) {
      newState.addedItems.push({
        ...foundItem,
        quantity: 1
      });
      // calculating the total
      newState.total = state.total + foundItem._source.giftprice;

      return newState;
    }
  }
  if (action.type === ECartActions.REMOVE_ITEM) {
    const itemToRemove = state.addedItems.find(
      item => action.id === item._source.id
    );

    if (itemToRemove) {
      const newTotal =
        state.total - itemToRemove._source.giftprice * itemToRemove.quantity;
      const addedItems = state.addedItems.filter(
        item => action.id !== item._source.id
      );
      // calculating the total
      return {
        ...state,
        addedItems,
        total: newTotal
      };
    }
  }
  // INSIDE CART COMPONENT
  if (action.type === ECartActions.ADD_QUANTITY) {
    const newState = {
      items: [...state.items],
      addedItems: [...state.addedItems],
      total: state.total
    };
    const addedItem = newState.addedItems.find(
      item => item._source.id === action.id
    );
    if (addedItem) {
      addedItem.quantity = addedItem.quantity + 1;
      newState.total = state.total + addedItem._source.giftprice;
      return newState;
    }
  }
  if (action.type === ECartActions.SUB_QUANTITY) {
    const newState = {
      items: [...state.items],
      addedItems: [...state.addedItems],
      total: state.total
    };
    const addedItem = newState.addedItems.find(
      item => item._source.id === action.id
    );
    // if the qt == 0 then it should be removed
    if (addedItem && addedItem.quantity === 1) {
      newState.addedItems = newState.addedItems.filter(
        item => item._source.id !== action.id
      );
      newState.total = state.total - addedItem._source.giftprice;
      return newState;
    } else if (addedItem) {
      addedItem.quantity = addedItem.quantity - 1;
      newState.total = state.total - addedItem._source.giftprice;
      return newState;
    }
  }

  return state;
};

export default cartReducer;
