import React from "react";
import { useNavigate } from "react-router-dom";

const Course = ({
  name,
  type,
  numOflessons,
  description,
  itemId,
  setCurrentCourse,
  img,
  createdBy,
  currentUser,
}) => {
  const navigate = useNavigate();

  const isTheUserTheCreator = () => {
    return createdBy === currentUser;
  };

  return (
    <div className="course">
      <h1>{name}</h1>
      <h3>{type}</h3>
      <p>{description}</p>
      <img src={img} alt="course IMG" width="250" height="200" />
      <h4>Number Of Lessons: {numOflessons}</h4>{" "}
      <button
        className="start-button"
        onClick={() => {
          setCurrentCourse(itemId);
          navigate("/course");
        }}
      >
        Start Course
      </button>
      <button
        className="update-button"
        disabled={!isTheUserTheCreator()}
        hidden={!isTheUserTheCreator()}
        onClick={() => {
          setCurrentCourse(itemId);
          navigate("/updatecourse");
        }}
      >
        Update Course
      </button>
    </div>
  );
};

export default Course;
