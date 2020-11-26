import { GET_COMMENTS, POST_COMMENT } from "./types";
import axios from "axios";
import { createNotification } from "./notificationActions";

export const getComments = () => async (dispatch) => {
  await axios.get("https://tictokclone.herokuapp.com/comments").then((res) => {
    dispatch({
      type: GET_COMMENTS,
      payload: res.data.data,
    });
  });
};

export const createComment = (comment) => async (dispatch) => {
  await axios
    .get(`https://tictokclone.herokuapp.com/users/getUser/${comment.userId}`)
    .then((res) => {
      const data = {
        message: comment.message,
        userId: comment.userId,
        postId: comment.postId,
        username: res.data.user.username,
        userProfile: res.data.user.profilePic,
      };
      axios
        .post("https://tictokclone.herokuapp.com/comments", data)
        .then((res) => {
          dispatch({
            type: POST_COMMENT,
            payload: res.data.data,
          });
          dispatch(createNotification(res.data.data, "comment"));
        });
    });
};
