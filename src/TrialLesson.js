import React from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

const TrialLesson = () => {
  const navigate = useNavigate();

  return (
    <div className="lesson-page">
      <h1>Trial Lesson</h1>
      <ReactPlayer
        className="video-teach"
        width="880px"
        height="480px"
        controls
        url="https://www.youtube.com/watch?v=Ohukhuev5xo&ab_channel=FrancoRaffo"
        volume={0}
        playing={true}
        onEnded={() => navigate("/score")}
        config={{
          youtube: {
            playerVars: {
              start: 20,
            },
          },
        }}
      />
      <ReactPlayer
        className="video-learn"
        width="880px"
        height="480px"
        controls
        volume={0}
        playing={true}
        url="https://www.youtube.com/watch?v=uI0PFxZ7TNA&ab_channel=littlesiha"
      />
    </div>
  );
};
export default TrialLesson;
