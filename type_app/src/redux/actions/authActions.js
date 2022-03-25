function loginAction(type, payload) {
  return {
    type,
    payload,
  };
}

function logoutAction(type, payload) {
  return {
    type,
    payload,
  };
}

export {loginAction, logoutAction};
