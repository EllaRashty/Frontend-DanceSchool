import React, { useState } from "react";
import "./App.css";
import Nav from "./Nav";
import SignIn from "./SignIn";
import UserProfile from "./UserProfile";
import CoursesList from "./CoursesList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateCourse from "./CreateCourse";
import CourseInfo from "./CourseInfo";
import UpdateCourse from "./UpdateCourse";
import LessonInfo from "./LessonInfo";
import ScorePage from "./ScorePage";
import TrialLesson from "./TrialLesson";
import HomePage from "./HomePage";

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
        <Nav user={user} />
        <Routes>
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
            element={
              <CourseInfo
                user={user}
                currentCourse={currentCourse}
                setCurrentLesson={setCurrentLesson}
              />
            }
          />
          <Route
            path="/updatecourse"
            element={<UpdateCourse user={user} currentCourse={currentCourse} />}
          />
          <Route
            path="/lesson"
            element={
              <LessonInfo
                user={user}
                currentCourse={currentCourse}
                currentLesson={currentLesson}
              />
            }
          />
          <Route path="/score" element={<ScorePage user={user} />} />
          <Route path="/triallesson" element={<TrialLesson />} />
          <Route path="/" element={<HomePage setUser={setUser} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

const ErrorPage = () => {
  return (
    <div>
      <h2>
        <br />
        <br />
        Page Not Exist
      </h2>
    </div>
  );
};
export default App;
