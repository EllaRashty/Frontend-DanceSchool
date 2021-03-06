import React, { useState, useEffect } from "react";
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
      <h3>For: {course.type}</h3>
      <h4>Number Of Lessons: {course.numberOfLessons}</h4>
      {course.lessons?.map((lesson) => (
        <div key={lesson.name + course.itemId.id}>
          <Lesson
            name={lesson.name}
            length={lesson.length}
            url={lesson.url}
            course={course.name}
            student={course.itemAttributes.student}
            start={course.itemAttributes.start}
            setCurrentLesson={setCurrentLesson}
          />
        </div>
      ))}
      {console.log(course)}
    </div>
  );
};

export default CourseInfo;
