import * as ACTIONS from "../actions/types"

const initialState = {
  cart: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      return action.product;
    case ACTIONS.REMOVE_FROM_CART:

      // Remove the product from the cart by returning only those that are nt matching the element to remove.
      state = state.filter(product => product.id !== action.product.id);

      return state.slice();
    default:
      return state;
  }
}
