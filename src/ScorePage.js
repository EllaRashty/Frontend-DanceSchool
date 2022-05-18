import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const ScorePage = (props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  useEffect(() => {
    // const interval = setInterval(() => {
    //   setValue((oldValue) => {
    //     const newValue = oldValue + 10;

    //     if (newValue === 100) {
    //       clearInterval(interval);
    //     }

    //     return newValue;
    //   });
    // }, 1000);
    const newValue = Math.ceil(Math.floor(Math.random() * 80) + 10);
    setValue(newValue);
  }, []);

  return (
    <div>
      <div className="score-border">
        <h1>{"Youre Score:"}</h1>
        <h1
          style={{
            color: "purple",
            fontWeight: "bold",
            padding: 20,
            borderRadius: 50,
            borderColor: "pink",
            borderStyle: "solid",
          }}
        >
          {Math.floor(Math.random() * (10 - 7) + 7)}
        </h1>
        <h3>Your progress:</h3>
        <ProgressBar value={value} max={100} />
      </div>

      <div>
        <button
          className="start-button"
          onClick={() => {
            navigate("/courseslist");
          }}
        >
          Courses List
        </button>
      </div>
    </div>
  );
};
export default ScorePage;
