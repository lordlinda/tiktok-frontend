import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  InputLabel,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./ProfileBio.css";
import {
  followUser,
  unfollowUser,
  editUserDetails,
  imageUpload,
} from "./redux/actions/userActions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
const ProfileBio = (props) => {
  const { following, followers, profilePic, username, _id } = props.profile;
  const { loading } = props;
  const [open, toggleOpen] = useState(false);

  const followUser = () => {
    props.followUser(props.match.params.userId);
  };

  const isFollowing = () => {
    if (
      props.following.find(
        (following) => following.userId === props.match.params.userId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  const unfollowUser = () => {
    props.unfollowUser(props.match.params.userId);
  };

  const [formData, setFormData] = useState({
    description: "",
    website: "",
    phone: "",
  });
  const { description, website, phone } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    toggleOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      bio: formData.description,
      website: formData.website,
      phoneNumber: formData.phone,
    };
    props.editUserDetails(_id, data);

    toggleOpen(false);
  };
  useEffect(() => {
    setFormData({
      ...formData,
      description: props.profile.bio,
      website: props.profile.website,
      phone: props.profile.phoneNumber,
    });
  }, [props.profile]);

  const photoUpload = (e) => {
    if (e.target.files[0]) {
      props.imageUpload(e.target.files[0], localStorage.user);
    }
  };

  const handleEditPicture = () => {
    const fileInput = document.querySelector("#photoUpload");
    fileInput.click();
  };
  return (
    <div className="profileBio">
      <div className="profileBio__info">
        <div className="profileBio__top">
          <div className="profileBio__headerLeft">
            <Avatar alt={username} src={profilePic} />
            <input
              type="file"
              className="profileBio__imageInput"
              id="photoUpload"
              onChange={photoUpload}
            />
          </div>
          <div className="profileBio__headerRight">
            <p>@{username}</p>
            <div className="profileBio__bottom">
              <div>
                <p>{following}</p>
                <span>following</span>
              </div>
              <div>
                <p>{followers}</p> <span>Fans</span>
              </div>
            </div>
            {props.user._id === _id ? (
              <>
                <div className="profileBio__icons">
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                  >
                    Edit Profile
                  </Button>
                  <IconButton onClick={handleEditPicture}>
                    <CameraAltOutlinedIcon fontSize="large" />
                  </IconButton>
                </div>

                <Dialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    Edit profile
                  </DialogTitle>
                  <DialogContent dividers>
                    <form>
                      <InputLabel>Description</InputLabel>
                      <Input
                        type="text"
                        onChange={handleChange}
                        value={description}
                        name="description"
                      />
                      <InputLabel>Website</InputLabel>
                      <Input
                        type="text"
                        onChange={handleChange}
                        value={website}
                        name="website"
                      />
                      <InputLabel>Phone number</InputLabel>
                      <Input
                        type="text"
                        onChange={handleChange}
                        value={phone}
                        name="phone"
                      />
                      <br />
                      <br />
                      <Button variant="outlined" onClick={handleSubmit}>
                        edit
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </>
            ) : isFollowing() ? (
              <Button
                variant="outlined"
                onClick={unfollowUser}
                color="secondary"
                disabled={loading}
              >
                unFollow
              </Button>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                onClick={followUser}
                disabled={loading}
              >
                Follow
              </Button>
            )}
          </div>
        </div>
        <div className="profileBio__details">
          {props.profile.bio ? <p>{description}</p> : null}
          {props.profile.website ? (
            <a href={website} target="_blank">
              {website}
            </a>
          ) : null}
          {props.profile.phoneNumber ? <p>{phone}</p> : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  following: state.user.following,
  profile: state.user.profile,
  loading: state.user.loading,
});

export default compose(
  connect(mapStateToProps, {
    followUser,
    unfollowUser,
    editUserDetails,
    imageUpload,
  }),
  withRouter
)(ProfileBio);
