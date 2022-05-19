import React from "react";
import { useNavigate } from "react-router-dom";

const Lesson = ({ name, length, url, setCurrentLesson,course,student,start }) => {
  const navigate = useNavigate();
  return (
    <div>
      <ol>
        {name} , {length}
        <button
          className="start-button"
          style={{padding:10, margin:10}}
          onClick={() => {
            setCurrentLesson({url,name,course,student,start});
            navigate("/lesson");
          }}
        >
          Watch
        </button>
      </ol>
    </div>
  );
};

export default Lesson;
