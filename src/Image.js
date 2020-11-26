import React from "react";
import VideoFooter from "./VideoFooter";
import VideoSidebar from "./VideoSidebar";
import "./Image.css";
function Image({
  url,
  shares,
  messages,
  likes,
  channel,
  description,
  song,
  id,
  user,
}) {
  return (
    <div>
      <img src={url} alt="" className="image__player" />
      <VideoFooter
        channel={channel}
        description={description}
        song={song}
        user={user}
      />
      {/**video sidebar */}
      <VideoSidebar likes={likes} messages={messages} shares={shares} id={id} />
    </div>
  );
}

export default Image;
