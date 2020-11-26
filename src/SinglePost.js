import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPost } from "./redux/actions/postActions";
import Post from "./Post";
import BottomNavigation from "./BottomNavigation";
import CircularProgress from "@material-ui/core/CircularProgress";
import { markNotificationRead } from "./redux/actions/notificationActions";
export const SinglePost = (props) => {
  const id = props.match.params.id;
  useEffect(() => {
    props.getPost(id);
  }, [id]);
  useEffect(() => {
    markNotificationRead(props.history.location.state._id);
  }, [props.history.location.state]);
  const { loading } = props;
  return (
    <div style={{ position: "fixed" }}>
      {!loading && props.post ? (
        <Post post={props.post} />
      ) : (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
      <BottomNavigation />
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post.post,
  loading: state.post.loading,
});

export default connect(mapStateToProps, { getPost, markNotificationRead })(
  SinglePost
);
