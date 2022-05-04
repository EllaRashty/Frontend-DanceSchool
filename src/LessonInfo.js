import React from "react";
import ReactPlayer from "react-player";

const LessonInfo = (props) => {
  const { currentLesson } = props;

  return (
    <div>
      <h1>{currentLesson.course}</h1>
      <h2>{currentLesson.name}</h2>
      <ReactPlayer width='880px' height='480px' controls url='https://youtu.be/7sDY4m8KNLc' />
      {console.log(currentLesson.name)}
      {console.log(currentLesson.url)}
    </div>
  );
};
export default LessonInfo;
