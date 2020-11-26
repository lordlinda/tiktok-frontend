import React, { useState, useEffect } from "react";
import "./Home.css";
import BottomNavigation from "./BottomNavigation";
import { connect } from "react-redux";
import { getLikes } from "./redux/actions/likeActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import FlipMove from "react-flip-move";
import Post from "./Post";
import { getComments } from "./redux/actions/commentActions";
import ProgressBar from "./ProgressBar";

function Home(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(props.posts);
  }, []);
  useEffect(() => {
    props.getLikes();
  }, [props.likes.length]);

  useEffect(() => {
    props.getComments();
  }, [props.comments.length]);
  const { loading, progress } = props;
  return (
    <div className="home">
      {progress ? <ProgressBar progress={progress} /> : null}

      <div className="app__videos">
        {!loading ? (
          <FlipMove>
            {!loading && posts.length > 0
              ? posts.map((post) => <Post post={post} key={post._id} />)
              : null}
          </FlipMove>
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
      </div>
      <BottomNavigation />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    posts: state.post.posts,
    comments: state.post.comments,
    likes: state.user.likes,
    loading: state.post.loading,
    progress: state.post.progress,
  };
};

export default connect(mapStateToProps, { getLikes, getComments })(Home);
