import { GET_NOTIFICATIONS } from "./types";
import axios from "axios";

export const getNotifications = () => async (dispatch) => {
  const id = localStorage.getItem("user");
  axios
    .get(`https://tictokclone.herokuapp.com/notifications/${id}`)
    .then((res) => {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createNotification = (data, type) => async (dispatch) => {
  if (data.postId) {
    await axios
      .get(`https://tictokclone.herokuapp.com/posts/${data.postId}`)
      .then((post) => {
        axios
          .get(`https://tictokclone.herokuapp.com/users/getUser/${data.userId}`)
          .then((res) => {
            if (post.data.data.channel !== localStorage.user) {
              const notification = {
                postId: data.postId,
                receipient: post.data.data.channel,
                sender: res.data.user.username,
                type: type,
              };
              axios
                .post(
                  "https://tictokclone.herokuapp.com/notifications",
                  notification
                )
                .then((res) => {})
                .catch((err) => {
                  console.log(err);
                });
            }
          });
      });
  } else {
    await axios
      .get(`https://tictokclone.herokuapp.com/users/getUser/${data.followerId}`)
      .then((res) => {
        const notification = {
          receipient: data.userId,
          sender: res.data.user.username,
          type: type,
        };
        axios
          .post("https://tictokclone.herokuapp.com/notifications", notification)
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
      });
  }
};

export const markNotificationRead = (id) => {
  axios
    .patch(`https://tictokclone.herokuapp.com/notifications/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
