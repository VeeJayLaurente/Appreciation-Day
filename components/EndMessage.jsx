import React from "react";
import "../src/EndMessage.css";

const EndMessage = () => {
  return (
    <div className="end-message">
      <h1>
        I hope you <span className="had-tooltip">HAD
          <span className="tooltip-text">Happy Appreciation Day 💖</span>
        </span> a good day!
      </h1>
    </div>
  );
};

export default EndMessage;
