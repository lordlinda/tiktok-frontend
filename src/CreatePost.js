import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, IconButton } from "@material-ui/core";
import { toast } from "react-toastify";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import "./createPost.css";
import { createPost } from "./redux/actions/postActions";
import { connect } from "react-redux";
function CreatePost(props) {
  const [data, setData] = useState({
    channel: localStorage.getItem("user"),
    description: "",
    song: "",
  });
  const { description, song } = data;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitPost = (e) => {
    e.preventDefault();
    if (description === "" || song === "") {
      return toast.error("Please first fill all the fields");
    } else {
      const variables = {
        ...data,
        user: props.username,
        url: props.url,
      };

      props.createPost(variables, props.history);
      setData({
        song: "",
        description: "",
      });
    }
  };

  return (
    <div className="createPost">
      <div className="createPost__header">
        <IconButton component={Link} to="/timeline">
          <CloseIcon />
        </IconButton>
        <div>
          <p>New post</p>
        </div>
      </div>
      <form
        noValidate
        autoComplete="off"
        className="createPost__form"
        onSubmit={submitPost}
      >
        <div>
          <TextField
            id="standard-size-normal"
            label="title"
            name="song"
            value={song}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            id="standard-size-normal"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <Button
          variant="contained"
          className="createPost__button"
          type="submit"
          color="secondary"
        >
          upload
        </Button>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    url: state.post.url,
    username: state.user.user.username,
  };
};
export default connect(mapStateToProps, { createPost })(CreatePost);
