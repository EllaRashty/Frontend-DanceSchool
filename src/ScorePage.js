import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const ScorePage = (props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [tryAgain, setTryAgain] = useState(true);
  useEffect(() => {
    const newValue = Math.trunc(Math.round(Math.random() * 80) + 10);
    setValue(newValue);
    if (newValue < 50) {
      setTryAgain(false);
    }
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
        <button
          className="update-button"
          style={{margin:6}}
          hidden={tryAgain}
          onClick={() => navigate(-1)}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
export default ScorePage;
