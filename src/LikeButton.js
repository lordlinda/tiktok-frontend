import { IconButton } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { likePost, unlikePost } from "./redux/actions/likeActions";
import "./likedButton.css";

export const likeButton = (props) => {
  const { user } = props;
  const likePost = () => {
    const like = {
      postId: props.id,
      userId: localStorage.user,
    };
    console.log(like);
    props.likePost(like);
  };

  const unlikePost = () => {
    const like = props.likes.filter((like) => like.postId === props.id)[0];

    props.unlikePost(like);
  };

  const isLikedPost = () => {
    if (
      props.likes
        .filter((like) => like.userId === localStorage.user)
        .find((like) => like.postId === props.id)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {isLikedPost() ? (
        <IconButton onClick={unlikePost.bind(this)}>
          <FavoriteIcon className="likedScream" />
        </IconButton>
      ) : (
        <IconButton onClick={likePost}>
          <FavoriteBorderIcon />
        </IconButton>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  likes: state.user.likes,
});

export default connect(mapStateToProps, { likePost, unlikePost })(likeButton);
