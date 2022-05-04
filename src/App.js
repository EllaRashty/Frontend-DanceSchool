import React, { useState } from "react";
import "./App.css";
import Nav from "./Nav";
import Login from "./Login";
import SignIn from "./SignIn";
import UserProfile from "./UserProfile";
import CoursesList from "./CoursesList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateCourse from "./CreateCourse";
import CourseInfo from "./CourseInfo";
import UpdateCourse from "./UpdateCourse";
import LessonInfo from "./LessonInfo";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [currentCourse, setCurrentCourse] = useState(
    JSON.parse(localStorage.getItem("items"))
  );
  const [currentLesson, setCurrentLesson] = useState(
    JSON.parse(localStorage.getItem("items"))
  );
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          {/* <Route path="/" element={<Welcome />} /> */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route
            path="/userprofile"
            element={<UserProfile user={user} setUser={setUser} />}
          />
          <Route path="/createcourse" element={<CreateCourse user={user} />} />
          <Route
            path="/courseslist"
            element={
              <CoursesList user={user} setCurrentCourse={setCurrentCourse} />
            }
          />
          <Route
            path="/course"
            element={<CourseInfo user={user} currentCourse={currentCourse} setCurrentLesson={setCurrentLesson}/>}
          />
          <Route
            path="/updatecourse"
            element={<UpdateCourse user={user} currentCourse={currentCourse} />}
          />
          <Route
            path="/lesson"
            element={<LessonInfo user={user} currentCourse={currentCourse} currentLesson={currentLesson}/>}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      {/* <div>
        <UserTemp className={"user-data"} />
      </div> */}
    </Router>
  );
}

const ErrorPage = () => {
  return (
    <div>
      <h1>Dance School</h1>
      <h2>Welcome</h2>
      {/* <UserTemp user={user} className={"user-data"} /> */}
    </div>
  );
};
export default App;
