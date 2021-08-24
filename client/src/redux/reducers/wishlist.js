import {FETCH_WISHLIST, TOGGLE_WISHLIST} from "../types";
const initWishlist = [];

export function wishlistReducer(state = initWishlist, {type, payload}) {
  switch (type) {
    case FETCH_WISHLIST:
      return (state = payload);
    case TOGGLE_WISHLIST:
      return (state = payload);

    default:
      return state;
  }
}
