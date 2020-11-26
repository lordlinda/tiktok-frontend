import storage from "../../firebase";
import {
  GET_POSTS,
  SET_PROGRESS,
  GET_POST,
  SET_POST,
  SET_URL,
  SET_LOADING,
} from "./types";
import axios from "axios";
import { toast } from "react-toastify";

export const getPosts = () => async (dispatch) => {
  await axios
    .get("https://tictokclone.herokuapp.com/posts")
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data.posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleUpload = (postMedia, history) => (dispatch) => {
  const uploadTask = storage.ref(`images/${postMedia.name}`).put(postMedia);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      dispatch({
        type: SET_PROGRESS,
        payload: progress,
      });
    },
    (error) => {
      console.log(error);
    },
    () => {
      //complete logic
      storage
        .ref("images")
        .child(postMedia.name)
        .getDownloadURL()
        .then((url) => {
          toast.success("Uploaded successfully");
          history.push("/post/story");
          dispatch({
            type: SET_PROGRESS,
            payload: 0,
          });
          dispatch({
            type: SET_URL,
            payload: url,
          });
        })
        .catch((err) => {
          toast.error("Sorry,please try again");
        });
    }
  );
};

export const getPost = (id) => async (dispatch) => {
  await axios
    .get(`https://tictokclone.herokuapp.com/posts/${id}`)
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createPost = (variables, history) => async (dispatch) => {
  dispatch({ type: SET_LOADING });
  await axios
    .post("https://tictokclone.herokuapp.com/posts", variables)
    .then((res) => {
      toast.success("Post uploaded successfully");
      history.push("/timeline");
      dispatch({
        type: SET_POST,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
