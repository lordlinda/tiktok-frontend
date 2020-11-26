import React from "react";
import "./VideoSidebar.css";
import ShareIcon from "@material-ui/icons/Share";
import Comments from "./Comments";
import LikeButton from "./LikeButton";

function VideoSidebar({ likes, messages, shares, id }) {
  return (
    <div className="videoSidebar">
      <div className="videoSidebar__button">
        <LikeButton id={id} />
        <p>{likes}</p>
      </div>
      <div className="videoSidebar__button">
        <Comments messages={messages} id={id} />
      </div>
    </div>
  );
}

export default VideoSidebar;
