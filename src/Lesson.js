import React from "react";

const Lesson = ({ name, length, url }) => {
  return (
    <div>
      <ol>
        {name} , {length} , {url}
      </ol>
    </div>
  );
};

export default Lesson;
