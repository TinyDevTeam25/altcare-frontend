import React from "react";
import "./VideoCall.css";

const VideoCall = () => {
  return (
    <div className="container video-call">
      <h2>Video Consultation</h2>
      <div className="video-box">
        <p>Doctor’s Video Stream</p>
      </div>
      <div className="controls">
        <button className="btn-primary">Mute</button>
        <button className="btn-outline">End Call</button>
      </div>
    </div>
  );
};

export default VideoCall;
