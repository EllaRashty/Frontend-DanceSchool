import React, { useState, useEffect } from "react";
import Course from "./Course";

const CoursesList = (props) => {
  const { user } = props;
  const { userId, username, avatar, role } = user;
  const { space, email } = userId;

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("hip hop");
  const { setCurrentCourse } = props;

  useEffect(() => {
    getItems();
    console.log(userId);
  }, [query]);

  const getItems = async () => {
    const response = await fetch(
      `http://localhost:8042/twins/items/${space}/${email}`,
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
      setCourses(result);
      // setCurrentCourse(result);
      console.log(result);
    }
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div>
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="courses">
        {courses.map((course) => (
          <div key={course.itemId.id}>
            <Course
              key={course.itemId.id}
              name={course.name}
              type={course.type}
              numOflessons={course.numberOfLessons}
              lessons={course.lessons}
              description={course.itemAttributes.description}
              itemId={course.itemId}
              setCurrentCourse={setCurrentCourse}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
