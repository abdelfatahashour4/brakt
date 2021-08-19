const {IS_LOGIN, IS_LOGOUT} = require("../types");

const initUser = {
  isLogin: false,
  username: "",
  email: "",
};

function authReducer(state = initUser, {type, payload}) {
  switch (type) {
    case IS_LOGIN:
      return (state = {
        ...state,
        isLogin: true,
        username: payload.username,
        email: payload.email,
      });
    case IS_LOGOUT:
      return (state = {
        ...state,
        isLogin: false,
        username: "",
        email: "",
      });
    default:
      return state;
  }
}

export {authReducer};
