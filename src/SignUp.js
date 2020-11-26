import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import {
  createUser,
  logout,
  signUpWithGoogle,
} from "./redux/actions/userActions";
import "./Login.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
function Signin(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.createUser(formData, props.history);
    setFormData({
      ...formData,
      username: "",
      email: "",
      password: "",
    });
  };
  const signUpWithGoogle = () => {
    props.signUpWithGoogle();
  };

  const signOut = () => {
    props.logout();
  };
  const { user } = props;

  return (
    <div className="login">
      <form>
        <TextField
          autoFocus
          margin="dense"
          name="username"
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} color="primary">
          signUp
        </Button>
        <Button color="secondary" onClick={signUpWithGoogle}>
          Signin with Google
        </Button>
        <br />
        <br />
        Already have an account ?<Link to="/">signin</Link>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, {
  createUser,
  logout,
  signUpWithGoogle,
})(Signin);
