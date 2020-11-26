import React, { useRef, useState } from "react";
import "./Video.css";
import VideoFooter from "./VideoFooter";
import VideoSidebar from "./VideoSidebar";

function Video({
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
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState();

  const handleVideoPress = () => {
    //if video is playing stop it
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    }
    //otherwise if its not plating
    //play it
    else {
      videoRef.current.play();
      setPlaying(true);
    }
  };
  return (
    <div className="video">
      <video
        ref={videoRef}
        loop
        onClick={handleVideoPress}
        className="video__player"
        src={url}
      ></video>
      {/**video footer */}
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

export default Video;
