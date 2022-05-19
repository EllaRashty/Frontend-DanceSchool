import React from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

const LessonInfo = (props) => {
  const { currentLesson } = props;
  const navigate = useNavigate();

  return (
    <div className="lesson-page">
      <h1>{currentLesson.course}</h1>
      <h2>{currentLesson.name}</h2>
      <ReactPlayer
        className="video-teach"
        width="880px"
        height="480px"
        controls
        url={currentLesson.url}
        // url="https://www.youtube.com/watch?v=Ohukhuev5xo&ab_channel=FrancoRaffo"
        volume={0}
        playing={true}
        onEnded={() => navigate("/score")}
        config={{
          youtube: {
            playerVars: {
              start: currentLesson.start,
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
        url={currentLesson.student}
        // url="https://www.youtube.com/watch?v=uI0PFxZ7TNA&ab_channel=littlesiha"
        // url="https://youtu.be/gcKj5LGN9rA"
        // loop={true}
      />
      {console.log(currentLesson.name)}
      {console.log(currentLesson.url)}
    </div>
  );
};
export default LessonInfo;
