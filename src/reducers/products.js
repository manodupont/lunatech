import * as ACTIONS from "../actions/types"

const initialState = {
  products: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.RECEIVE_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
