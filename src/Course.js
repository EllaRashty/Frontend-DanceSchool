import React from "react";
import { useNavigate } from "react-router-dom";

const Course = ({
  name,
  type,
  numOflessons,
  description,
  lessons,
  itemId,
  setCurrentCourse,
}) => {
  // const updateItem = async () => {
  //   const response = await fetch(
  //     `http://localhost:8042/twins/items/${space}/${email}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   if (!!response) {
  //     const result = await response.json();
  //     if (result.error) {
  //       alert("User already exists!\nEnter different details!");
  //       return;
  //     }
  //     localStorage.setItem("items", JSON.stringify(result));
  //     // setCourses(result);
  //     // setCurrentCourse(result);
  //     console.log(result);
  //   }
  // };

  const navigate = useNavigate();

  return (
    <div className="course">
      <h1>{name}</h1>
      <h3>{type}</h3>
      <p>{description}</p>
      <img src="" alt="" />
      <h4>Number Of Lessons: {numOflessons}</h4>{" "}
      {lessons.map((lesson) => (
        <li key={lesson.name}>{lesson.name}</li>
      ))}
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
        className="start-button"
        onClick={() => {
          setCurrentCourse(itemId);
          navigate("/updatecourse");
          // 6185887d-5f79-466c-a469-38de31320a78
        }}
      >
        Update Course
      </button>
    </div>
  );
};

export default Course;
