import {combineReducers} from "redux";
import {authReducer} from "./reducers/auth";
import {createPostReducer} from "./reducers/createPost";
import {wishlistReducer} from "./reducers/wishlist";

const combine = combineReducers({
  createPost: createPostReducer,
  auth: authReducer,
  wishlist: wishlistReducer,
});

export {combine};
