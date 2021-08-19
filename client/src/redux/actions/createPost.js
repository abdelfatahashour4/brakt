function statePostAction(type, payload) {
  return {
    type,
    payload: {
      name: payload.name,
      value: payload.value,
    },
  };
}

function tagsAction(type, payload) {
  return {
    type,
    payload: {
      checked: payload.checked,
      name: payload.name,
      value: payload.value,
    },
  };
}

function contentAction(type, payload) {
  return {
    type,
    payload,
  };
}

function imageAction(type, payload) {
  return {
    type,
    payload,
  };
}

function successCreatePostAction(type) {
  return {
    type,
  };
}

function errorCreatePostAction(type) {
  return {
    type,
  };
}

export {
  statePostAction,
  tagsAction,
  contentAction,
  imageAction,
  successCreatePostAction,
  errorCreatePostAction,
};
