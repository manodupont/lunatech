import * as ACTIONS from "../actions/types"
import update from 'react-addons-update'

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      state.push(action.product);

      return state.slice();
    }
    case ACTIONS.REMOVE_FROM_CART: {

      state = state.filter(product => product.id !== action.id);

      return state.slice();
    }
    default:
      return state;
  }
}
