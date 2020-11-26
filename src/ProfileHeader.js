import React, { useState } from "react";
import { connect } from "react-redux";
import "./ProfileHeader.css";
import SettingsIcon from "@material-ui/icons/Settings";
import { Button, Dialog, DialogActions, IconButton } from "@material-ui/core";
import { logout } from "./redux/actions/userActions";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
const ProfileHeader = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.logout(props.history);
    setOpen(false);
  };
  return (
    <div>
      <div className="profileHeader">
        <div>
          <IconButton onClick={handleClickOpen}>
            <SettingsIcon fontSize="default" />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Logout
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default compose(connect(null, { logout }), withRouter)(ProfileHeader);
