import React, { useState, useEffect } from "react";
import "./Comments.css";
import CommentForm from "./CommentForm";
import { Avatar, Dialog, DialogContent, IconButton } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
import { connect } from "react-redux";
import { getComments } from "./redux/actions/commentActions";

export const Comments = (props) => {
  const { messages } = props;
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    console.log("clicked");
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setComments(
      props.comments.filter((comment) => comment.postId === props.id)
    );
  }, [props.comments.length]);

  return (
    <div className="comments">
      <IconButton onClick={handleToggle}>
        <MessageIcon />
      </IconButton>

      <p>{messages}</p>
      <Dialog onClose={handleClose} open={open} className="comments__modal">
        <DialogContent>
          <CommentForm id={props.id} />
          {comments.map((comment) => (
            <div className="comments__posts" key={comment._id}>
              <Avatar src={comment.userProfile} />
              <div>
                <div className="comment__username">{comment.username}</div>
                <p>{comment.message}</p>
              </div>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  comments: state.post.comments,
});

export default connect(mapStateToProps, { getComments })(Comments);
