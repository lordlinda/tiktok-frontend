import { Button, Divider, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { loginUser, signUpWithGoogle } from "./redux/actions/userActions";
import { connect } from "react-redux";
import "./Login.css";
import { Link } from "react-router-dom";
function Signin(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.loginUser(formData, props.history);
    setFormData({
      ...formData,
      username: "",
      email: "",
      password: "",
    });
  };

  const signUpWithGoogle = () => {
    props.signUpWithGoogle(props.history);
  };

  return (
    <div className="login">
      <form>
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
          signin
        </Button>
        <Button color="secondary" onClick={signUpWithGoogle}>
          Signin with Google
        </Button>
        <br />
        <br />
        Dont have an account ?<Link to="signup">signup</Link>
      </form>
      <Divider />
    </div>
  );
}

export default connect(null, { loginUser, signUpWithGoogle })(Signin);
