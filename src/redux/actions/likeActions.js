import { GET_LIKES, LIKE_POST, UNLIKE_POST } from "./types";
import { createNotification } from "./notificationActions";
import axios from "axios";

export const getLikes = () => async (dispatch) => {
  await axios.get("https://tictokclone.herokuapp.com/likes").then((res) => {
    dispatch({
      type: GET_LIKES,
      payload: res.data.data,
    });
  });
};

export const likePost = (like) => async (dispatch) => {
  await axios
    .post("https://tictokclone.herokuapp.com/likes/likePost", like)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data.data,
      });
      dispatch(createNotification(like, "like"));
    });
};

export const unlikePost = (like) => async (dispatch) => {
  await axios
    .patch(
      `https://tictokclone.herokuapp.com/likes/unlikePost/${like._id}`,
      like
    )
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: like,
      });
    });
};
