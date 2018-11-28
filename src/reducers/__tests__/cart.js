import reducer from "../cart";
import * as types from "../../actions/types";

describe("cart reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      cart: []
    });
  });

  it("ADD_TO_CART should add the products to the cart state", () => {
    expect(
      reducer(undefined, {
        type: types.ADD_TO_CART,
        product: [{
          "id": 151,
          "ean": "6796211",
          "name": "BERIT",
          "weight": 23.77,
          "description": "fabric",
          "price": null,
          "assembled": true,
          "dimension": {
            "width": 32.93,
            "depth": 11.39,
            "height": 28.8
          }
        }]
      })
    ).toEqual(
      [{
        "id": 151,
        "ean": "6796211",
        "name": "BERIT",
        "weight": 23.77,
        "description": "fabric",
        "price": null,
        "assembled": true,
        "dimension": {
          "width": 32.93,
          "depth": 11.39,
          "height": 28.8
        }
      }]
    );
  });
  it("REMOVE_TO_CART should remove the products from the cart when the cart contains only 1 element", () => {
    const initialState = [
      {
        "id": 151,
        "ean": "6796211",
        "name": "BERIT",
        "weight": 23.77,
        "description": "fabric",
        "price": null,
        "assembled": true,
        "dimension": {
          "width": 32.93,
          "depth": 11.39,
          "height": 28.8
        }
      }
    ];
    expect(
      reducer(initialState, {
        type: types.REMOVE_FROM_CART,
        product: {
          "id": 151,
          "ean": "6796211",
          "name": "BERIT",
          "weight": 23.77,
          "description": "fabric",
          "price": null,
          "assembled": true,
          "dimension": {
            "width": 32.93,
            "depth": 11.39,
            "height": 28.8
          }
        }
      })
    ).toEqual(
      []
    );
  });
  it("REMOVE_TO_CART should remove the products from the cart when the cart contains 2 or more elements", () => {
    const initialState = [
      {
        "id": 151,
        "ean": "6796211",
        "name": "BERIT",
        "weight": 23.77,
        "description": "fabric",
        "price": null,
        "assembled": true,
        "dimension": {
          "width": 32.93,
          "depth": 11.39,
          "height": 28.8
        }
      },
      {
        "id": 113,
        "ean": "test",
        "name": "test",
        "weight": 23.77,
        "description": "fabric",
        "price": null,
        "assembled": true,
        "dimension": {
          "width": 32.93,
          "depth": 11.39,
          "height": 28.8
        }
      }
    ];
    expect(
      reducer(initialState, {
        type: types.REMOVE_FROM_CART,
        product: {
          "id": 113,
          "ean": "6796211",
          "name": "BERIT",
          "weight": 23.77,
          "description": "fabric",
          "price": null,
          "assembled": true,
          "dimension": {
            "width": 32.93,
            "depth": 11.39,
            "height": 28.8
          }
        }
      })
    ).toEqual(
      [{
        "id": 151,
        "ean": "6796211",
        "name": "BERIT",
        "weight": 23.77,
        "description": "fabric",
        "price": null,
        "assembled": true,
        "dimension": {
          "width": 32.93,
          "depth": 11.39,
          "height": 28.8
        }
      }]
    );
  });
});
