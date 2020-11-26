import React, { useState, useEffect } from "react";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import "./BottomNavigation.css";
import { Link, withRouter } from "react-router-dom";
import {
  Avatar,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { handleUpload } from "./redux/actions/postActions";
import { connect } from "react-redux";
import { compose } from "redux";
import { getNotifications } from "./redux/actions/notificationActions";
import Notifications from "./Notifications";
import Badge from "@material-ui/core/Badge";

const BottomNavigation = (props) => {
  const [open, toggleOpen] = useState(false);
  const [unreadNotifications, setUnReadNotifications] = useState([]);

  const userId = localStorage.getItem("user");
  const handleFileInput = () => {
    document.querySelector("#fileInput").click();
  };
  const handleClose = () => {
    toggleOpen(!open);
  };
  const handleEditPicture = (e) => {
    if (e.target.files[0]) {
      props.handleUpload(e.target.files[0], props.history);
    }
  };
  useEffect(() => {
    props.getNotifications();
  }, [props.notifications.length]);

  useEffect(() => {
    setUnReadNotifications(
      props.notifications.filter((notification) => notification.read === false)
    );
  }, [props.notifications.length]);

  return (
    <>
      <div className="bottomNavigation__menu">
        <IconButton>
          <Link to="/timeline">
            <HomeRoundedIcon />
          </Link>
        </IconButton>
        <div className="bottomNavigation__post">
          <IconButton onClick={handleFileInput}>
            <AddBoxOutlinedIcon />
          </IconButton>
          <input
            type="file"
            id="fileInput"
            className="fileInput"
            onChange={handleEditPicture}
            accept="image/*"
          />
        </div>

        <IconButton onClick={handleClose}>
          <Badge
            color="secondary"
            variant="dot"
            invisible={unreadNotifications.length > 0 ? false : true}
          >
            <ChatBubbleOutlineRoundedIcon />
          </Badge>
        </IconButton>
        <Dialog
          className="notification__modal"
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Notifications
          </DialogTitle>
          <DialogContent dividers>
            <Notifications notifications={props.notifications} />
          </DialogContent>
        </Dialog>
        <Link to={`/profile/${userId}`}>
          <Avatar />
        </Link>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    notifications: state.user.notifications,
  };
};

export default compose(
  connect(mapStateToProps, { handleUpload, getNotifications }),
  withRouter
)(BottomNavigation);
