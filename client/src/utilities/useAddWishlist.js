import {notify} from "../components/Toast";
import {wishlistAction} from "../redux/actions/wishlistAction";
import {FETCH_WISHLIST} from "../redux/types";

export function ToggleWishlist(initState, dispatch) {
  const getWishlist = localStorage.getItem("wishlist_articles");

  if (!getWishlist) {
    const newWishlist = JSON.stringify([initState]);
    localStorage.setItem("wishlist_articles", newWishlist);
    dispatch(wishlistAction(FETCH_WISHLIST, [initState]));
    notify("success", "🚀 added article");
  } else {
    // here toggle wishlist items
    const arr = JSON.parse(getWishlist);

    if (arr.filter(item => item._id === initState._id).length > 0) {
      // already in wishlist
      const newWishlist = arr.filter(item => item._id !== initState._id);
      localStorage.setItem("wishlist_articles", JSON.stringify(newWishlist));
      dispatch(wishlistAction(FETCH_WISHLIST, newWishlist));
      notify("success", "🦄 removed article");
    } else {
      localStorage.setItem(
        "wishlist_articles",
        JSON.stringify([initState, ...arr])
      );
      dispatch(wishlistAction(FETCH_WISHLIST, [initState, ...arr]));
      notify("success", "🚀 added article");
    }
  }
}
