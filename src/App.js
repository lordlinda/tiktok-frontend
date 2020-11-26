import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./CreatePost";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { connect } from "react-redux";
import { getUserData } from "./redux/actions/userActions";
import { getPosts } from "./redux/actions/postActions";
import SinglePost from "./SinglePost";

function App(props) {
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    props.getUserData();

    return true;
  };
  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
  useEffect(() => {
    props.getPosts();
  }, [props.posts.length]);

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <AuthRoute exact path="/timeline" component={Home} />
          <AuthRoute exact path="/post/story" component={CreatePost} />
          <AuthRoute exact path="/profile/:userId" component={Profile} />
          <AuthRoute exact path="/post/:id" component={SinglePost} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  posts: state.post.posts,
});

export default connect(mapStateToProps, { getUserData, getPosts })(App);
