import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ value, max }) => {
  return (
    <div>
      <progress
        style={{ marginLeft: 30, color:'pink',}}
        value={value}
        max={max}
      />
      <span style={{ padding: 10 }}>{(value / max) * 100}%</span>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
};

ProgressBar.defaultProps = {
  max: 100,
};

export default ProgressBar;
