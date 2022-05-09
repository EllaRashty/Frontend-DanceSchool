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
        url="https://youtu.be/wV8cDpJa2f4"
        onEnded={() => navigate("/score")}
      />
      <ReactPlayer
        className="video-learn"
        width="880px"
        height="480px"
        controls
        url="https://youtu.be/obtDeYM_kug"
      />
      {console.log(currentLesson.name)}
      {console.log(currentLesson.url)}
    </div>
  );
};
export default LessonInfo;
