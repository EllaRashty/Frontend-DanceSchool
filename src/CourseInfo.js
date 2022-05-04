import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lesson from "./Lesson";

const CourseInfo = (props) => {
  const { user } = props;
  const { userId, username, avatar, role } = user;
  const { space, email } = userId;
  const { currentCourse } = props;
  const { setCurrentLesson } = props;
  const [course, setCourse] = useState({});

  useEffect(() => {
    getItems();
    console.log(currentCourse);
    console.log(userId);
  }, []);
  const getItems = async () => {
    const response = await fetch(
      `http://localhost:8042/twins/items/${space}/${email}/${currentCourse.space}/${currentCourse.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!!response) {
      const result = await response.json();
      if (result.error) {
        alert("User already exists!\nEnter different details!");
        return;
      }
      localStorage.setItem("items", JSON.stringify(result));
      setCourse(result);
      console.log(result);
    }
  };

  return (
    <div className="course-page">
      <h1>{course.name}</h1>
      <h2>{course.type}</h2>
      {/* <p>{course.itemAttributes.description}</p> */}
      <h3>Number Of Lessons: {course.numberOfLessons}</h3>
      {course.lessons?.map((lesson) => (
        <div key={lesson.name+lesson.length}>
          <Lesson
            name={lesson.name}
            length={lesson.length}
            url={lesson.url}
            course={course.name}
            setCurrentLesson={setCurrentLesson}
          />
        </div>
      ))}
      {console.log(course)}
    </div>
  );
};

export default CourseInfo;
