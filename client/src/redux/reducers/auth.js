const {IS_LOGIN, IS_LOGOUT} = require("../types");

const initUser = {
  isLogin: false,
  _id: "",
  username: "",
  email: "",
};

function authReducer(state = initUser, {type, payload}) {
  switch (type) {
    case IS_LOGIN:
      return (state = {
        ...state,
        isLogin: true,
        _id: payload._id,
        username: payload.username,
        email: payload.email,
      });
    case IS_LOGOUT:
      return (state = {
        ...state,
        isLogin: false,
        _id: "",
        username: "",
        email: "",
      });
    default:
      return state;
  }
}

export {authReducer};
