import React from "react";
import "./VideoFooter.css";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import Ticker from "react-ticker";
import { Link } from "react-router-dom";

function VideoFooter({ channel, description, song, user }) {
  return (
    <div className="videoFooter">
      <div className="videoFooter__text">
        <Link to={`/profile/${channel}`}>
          <h3>@{user}</h3>
        </Link>

        <p>{description}</p>
        <div className="videoFooter__ticker">
          <MusicNoteIcon className="videoFooter__icon" />
          <Ticker mode="smooth">
            {({ index }) => (
              <>
                <p style={{ whiteSpace: "nowrap" }}>{song}</p>
              </>
            )}
          </Ticker>
        </div>
      </div>
      <img
        src="https://static.thenounproject.com/png/934821-200.png"
        alt=""
        className="videoFooter__record"
      />
    </div>
  );
}

export default VideoFooter;
