import React, { forwardRef } from "react";
import Video from "./Video";
import Image from "./Image";
import "./Post.css";
const Post = forwardRef((props, ref) => {
  const {
    url,
    description,
    channel,
    likes,
    shares,
    messages,
    _id,
    song,
    user,
  } = props.post;
  const getFileExtension = (url) => {
    if (url) {
      const name = url.slice(((url.lastIndexOf(".") - 1) >>> 0) + 2);
      return name.split("?")[0];
    }
  };

  return (
    <div ref={ref} className="post">
      {getFileExtension(props.post.url) === "jpg" ? (
        <Image
          key={_id}
          url={url}
          id={_id}
          messages={messages}
          shares={shares}
          likes={likes}
          description={description}
          channel={channel}
          user={user}
          song={song}
        />
      ) : (
        <Video
          key={_id}
          url={url}
          id={_id}
          messages={messages}
          shares={shares}
          likes={likes}
          description={description}
          channel={channel}
          user={user}
          song={song}
        />
      )}
    </div>
  );
});

export default Post;
