import React from "react";
import { useNavigate } from "react-router-dom";

const Lesson = ({ name, length, url, setCurrentLesson,course }) => {
  const navigate = useNavigate();
  return (
    <div>
      <ol>
        {name} , {length} , {url}
        <button
          className="start-button"
          onClick={() => {
            setCurrentLesson({url,name,course});
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
