import {createPostReducer} from "./reducers/createPost";
import {authReducer} from "./reducers/auth";
import {combineReducers} from "redux";

const combine = combineReducers({
  createPost: createPostReducer,
  auth: authReducer,
});

export {combine};
