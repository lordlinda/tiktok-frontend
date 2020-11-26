import storage, { auth, provider } from "../../firebase";
import {
  SET_USER,
  SET_USER_PROFILE,
  GET_FOLLOWING,
  UNFOLLOW_USER,
  FOLLOW_USER,
  LOGOUT,
} from "../actions/types";
import { getSavedPosts } from "./saveActions";
import axios from "axios";
import { toast } from "react-toastify";
import { createNotification } from "./notificationActions";

export const signUpWithGoogle = (history) => (dispatch) => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result);
      localStorage.setItem("token", result.credential.idToken);
      if (result.additionalUserInfo.isNewUser) {
        //if true,then we create a new user
        dispatch(createUser(result.additionalUserInfo.profile, history));
      } else {
        //if false,login user
        dispatch(loginUser(result.additionalUserInfo.profile, history));
      }
    })
    .catch((error) => {
      console.log(error);
      alert(error.msg);
    });
};

export const logout = (history) => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: LOGOUT,
  });
  history.push("/");
};

export const createUser = (authUser, history) => async (dispatch) => {
  const user = {
    email: authUser.email,
    password: authUser.password ? authUser.password : "google",
    profilePic: authUser.picture,
    username: authUser.name ? authUser.name : authUser.username,
  };
  await axios
    .post("https://tictokclone.herokuapp.com/users/newUser", user)
    .then((res) => {
      localStorage.setItem("user", res.data.data._id);
      if (!localStorage.token) {
        localStorage.setItem("token", "tokens");
      }
      dispatch({
        type: SET_USER,
        payload: res.data.data,
      });
      history.push("/timeline");
    })
    .catch((err) => {
      toast.error("sorry,user already exists");
      console.log(err);
    });
};

export const loginUser = (authUser, history) => async (dispatch) => {
  const user = {
    email: authUser.email,
    password: authUser.password ? authUser.password : "google",
  };
  await axios
    .post("https://tictokclone.herokuapp.com/users/login", user)
    .then((res) => {
      localStorage.setItem("user", res.data.user._id);
      if (!localStorage.token) {
        localStorage.setItem("token", "tokens");
      }
      dispatch({
        type: SET_USER,
        payload: res.data.user,
      });
      history.push("/timeline");
    })
    .catch((err) => {
      console.log(err);
      toast.error("sorry,user not found");
    });
};

export const getUserData = () => async (dispatch) => {
  const id = localStorage.getItem("user");
  await axios
    .get(`https://tictokclone.herokuapp.com/users/getUser/${id}`)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const followUser = (userId) => async (dispatch) => {
  const data = {
    userId: userId,
    followerId: localStorage.getItem("user"),
  };
  await axios
    .patch(`https://tictokclone.herokuapp.com/users/follow`, data)
    .then((res) => {
      dispatch({
        type: FOLLOW_USER,
        payload: data,
      });
      dispatch(createNotification(data, "follow"));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const unfollowUser = (userId) => async (dispatch) => {
  const data = {
    userId: userId,
    followerId: localStorage.getItem("user"),
  };
  await axios
    .delete("https://tictokclone.herokuapp.com/users/unfollow", { data })
    .then((res) => {
      dispatch({
        type: UNFOLLOW_USER,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getUserProfile = (id) => async (dispatch) => {
  await axios
    .get(`https://tictokclone.herokuapp.com/users/getUser/${id}`)
    .then((res) => {
      dispatch({
        type: SET_USER_PROFILE,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUsersFollowed = (id) => async (dispatch) => {
  const id = localStorage.getItem("user");
  await axios
    .get(`https://tictokclone.herokuapp.com/users/followees/${id}`)
    .then((res) => {
      dispatch({
        type: GET_FOLLOWING,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editUserDetails = (id, userDetails) => async (dispatch) => {
  await axios
    .patch(
      `https://tictokclone.herokuapp.com/users/userDetails/${id}`,
      userDetails
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const imageUpload = (image, userId) => (dispatch) => {
  const uploadTask = storage.ref(`/images/${image.name}`).put(image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log(error);
    },
    () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          dispatch(editUserDetails(userId, { profilePic: url }));
        });
    }
  );
};
