import {createStore} from "redux";
import {combine} from "./companiedReducers";

const store = createStore(
  combine,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export {store};
