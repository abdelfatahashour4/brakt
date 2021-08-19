import {
  CHANGE_STATE_POST,
  CHANGE_TAGS_POST,
  CHANGE_CONTENT_POST,
  SUCCESS_CREATE_POST,
  ERROR_CREATE_POST,
} from "../types";

const initStateCreatePost = {
  title: "",
  category: "",
  tags: [],
  description: "",
  content: "",
};

function createPostReducer(state = initStateCreatePost, {type, payload}) {
  switch (type) {
    case CHANGE_STATE_POST:
      if (payload.name === "category") {
        return (state = {
          ...state,
          tags: [],
          category: payload.value,
        });
      } else {
        return (state = {
          ...state,
          [payload.name]: payload.value,
        });
      }
    case CHANGE_TAGS_POST:
      if (!payload.checked) {
        if (!state.tags.includes(payload.value)) {
          return (state = {
            ...state,
            tags: [...state.tags, payload.value],
          });
        } else {
          return (state = {
            ...state,
            tags: state.tags.filter(tag => tag !== payload.value),
          });
        }
      } else {
        return (state = {
          ...state,
          tags: [...state.tags, payload.value],
        });
      }
    case CHANGE_CONTENT_POST:
      return (state = {
        ...state,
        content: payload,
      });
    case ERROR_CREATE_POST:
      return state;
    case SUCCESS_CREATE_POST:
      return (state = {
        title: "",
        category: "",
        tags: [],
        description: "",
        content: "",
        imagePost: null,
      });
    default:
      return state;
  }
}

export {createPostReducer};
