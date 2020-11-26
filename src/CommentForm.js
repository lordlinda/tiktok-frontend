import React, { useState } from "react";
import { connect } from "react-redux";
import { createComment } from "./redux/actions/commentActions";
import "./CommentForm.css";
export const CommentForm = (props) => {
  const [comment, setComment] = useState("");
  const postComment = (e) => {
    e.preventDefault();
    const data = {
      message: comment,
      postId: props.id,
      userId: localStorage.getItem("user"),
    };
    props.createComment(data);
    setComment("");
  };
  return (
    <div>
      <form className="commentForm__form">
        <input
          className="commentForm__input"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          className="commentForm__button"
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, { createComment })(CommentForm);
