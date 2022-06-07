import React from "react";
import { useNavigate } from "react-router-dom";
import home from "./svgs/home.svg";
import Login from "./Login";

const HomePage = (props) => {
  const { setUser } = props;
  const navigate = useNavigate();
  return (
    <div>
      <div className="home-page">
        <img
          style={{ padding: 0, marginTop: 0, marginBottom:0}}
          src={home}
          alt="course IMG"
          width="400"
          height="300"
        ></img>

        <h4 style={{ padding: 0 }}>
          Love to dance but just too shy to show it?
          <br />
          <br />
          With DanceSchool you can take dancing classes from our world-class
          <br /> choreographers and dancers without ever leaving your room.
          <br />
          All of our dance courses are accessible through your web account,
          <br />
          you can join us anywhere & any time!
        </h4>
        <Login setUser={setUser} />
        <button
          style={{ marginTop: 0, marginBottom: 5 }}
          className="trial-lesson"
          onClick={() => {
            navigate("/triallesson");
          }}
        >
          Try Trial Lesson
        </button>
      </div>
    </div>
  );
};

export default HomePage;
