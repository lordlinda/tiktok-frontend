import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProfileBio from "./ProfileBio";
import ProfileHeader from "./ProfileHeader";
import "./Profile.css";
import ProfileGrid from "./ProfileGrid";
import BottomNavigation from "./BottomNavigation";
import {
  getUserProfile,
  getUsersFollowed,
  editUserDetails,
} from "./redux/actions/userActions";
import { getPosts } from "./redux/actions/postActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProgressBar from "./ProgressBar";

export const Profile = (props) => {
  const { loading, user, progress } = props;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    props.getUserProfile(props.match.params.userId);
  }, [
    props.match.params.userId,
    props.following.length,
    props.editUserDetails,
  ]);

  useEffect(() => {
    props.getUsersFollowed();
  }, [props.following.length]);

  useEffect(() => {
    setPosts(
      props.posts.filter((post) => post.channel == props.match.params.userId)
    );
  }, [props.posts.length]);

  return (
    <div>
      {!loading && user ? (
        <>
          {progress ? <ProgressBar progress={progress} /> : null}
          <ProfileHeader />
          <ProfileBio />
          <ProfileGrid posts={posts} />
          <BottomNavigation />
        </>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            display: "grid",
            placeItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.profile,
  posts: state.post.posts,
  following: state.user.following,
  progress: state.post.progress,
});

export default connect(mapStateToProps, {
  getUserProfile,
  getUsersFollowed,
  getPosts,
  editUserDetails,
})(Profile);
