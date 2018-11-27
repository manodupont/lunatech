import reducer from "../products";
import * as types from "../../actions/types";

describe("products reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      products: []
    });
  });

  it("RECEIVE_PRODUCTS should add the products to the products state", () => {
    expect(
      reducer(undefined, {
        type: types.RECEIVE_PRODUCTS,
        products: [{
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
});
