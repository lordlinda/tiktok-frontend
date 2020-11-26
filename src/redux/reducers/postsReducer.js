import {
  GET_POSTS,
  SET_PROGRESS,
  GET_COMMENTS,
  GET_POST,
  GET_SAVED_POSTS,
  SET_URL,
  SET_POST,
  SET_LOADING,
  POST_COMMENT,
} from "../actions/types";

const initialState = {
  posts: [],
  progress: 0,
  url: "",
  comments: [],
  post: null,
  savedPosts: [],
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case SET_POST:
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts],
      };
    case POST_COMMENT:
      return {
        ...state,
        loading: false,
        comments: [action.payload, ...state.comments],
      };
    case GET_SAVED_POSTS:
      return {
        ...state,
        savedPosts: action.payload,
      };
    case SET_URL:
      return {
        ...state,
        url: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
