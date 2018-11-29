import reducer from "../cart";
import * as types from "../../actions/types";

describe("cart reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(
      []
    );
  });

  it("ADD_TO_CART should add the product to the cart", () => {
    expect(
      reducer([],
        {
          type: types.ADD_TO_CART,
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
  it("REMOVE_FROM_CART should remove to the cart state", () => {
    expect(
      reducer([
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
          }],
        {
          type: types.REMOVE_FROM_CART,
          id: 151
        })
    ).toEqual(
      []
    );
  });
});
