import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
  },
  field: {
    width: "80%",
    margin: 20,
  },
  roleStyle: {},
  avatar: {
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 180,
    width: 56,
    height: 56,
  },
}));

const UpdateCourse = (props) => {
  const { currentCourse } = props;

  const { user } = props;
  const { userId, username, avatar, role } = user;
  const { space, email } = userId;

  const [itemType, setItemType] = useState("");
  const [name, setName] = useState("");

  const [typeOfDance, setTypeOfDance] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfLessons, setNumberOfLessons] = useState("");
  const [lessons, setLessons] = useState([{ name: "", length: "", url: "" }]);

  const addLessons = () => {
    let newLesson = { name: "", length: "", url: "" };

    setLessons([...lessons, newLesson]);
  };
  const removeLessons = () => {
    lessons.pop();
    setLessons([...lessons]);
  };

  const navigate = useNavigate();
  const classes = useStyles();

  const updateItem = async () => {
    const response = await fetch(
      `http://localhost:8042/twins/items/${space}/${email}/${currentCourse.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: itemType,
          name: name,
          itemAttributes: {
            typeOfDance: typeOfDance,
            workingHours: workingHours,
            description: description,
          },
          numberOfLessons: numberOfLessons,
          lessons: lessons,
        }),
      }
    );

    if (!!response) {
      const result =  response.json();
      if (result.error) {
        alert("You can't create course!\nEnter different details!");
        return;
      }
      localStorage.setItem("item", result);
      console.log(result);
      navigate("/home");
    }
  };

  const handletypeChange = (e) => {
    setItemType(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlTypeOfDanceChange = (e) => {
    setTypeOfDance(e.target.value);
  };

  const handleWorkingHoursChange = (e) => {
    setWorkingHours(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleNumberOfLessonsChange = (e) => {
    setNumberOfLessons(e.target.value);
  };

  const handleLessonsChange = (event, index) => {
    let data = [...lessons];
    data[index][event.target.name] = event.target.value;
    setLessons(data);
  };

  return (
    <div className="create-cours-page">
      <Typography className={classes.title}>Update Course</Typography>
      <TextField
        className={classes.field}
        id="item type"
        required
        label="Enter Level"
        placeholder="tas"
        value={itemType}
        onChange={handletypeChange}
      />
      <TextField
        className={classes.field}
        id="name"
        required
        label="Enter Course Name"
        placeholder="name"
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        className={classes.field}
        id="typeOfDance"
        required
        label="Type Of Dance"
        placeholder="tod"
        value={typeOfDance}
        onChange={handlTypeOfDanceChange}
      />
      <TextField
        className={classes.field}
        id="workingHours"
        required
        label="Working Hours"
        placeholder="wh"
        value={workingHours}
        onChange={handleWorkingHoursChange}
      />

      <TextField
        className={classes.field}
        id="description"
        required
        label="Description"
        placeholder="description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        className={classes.field}
        id="numberOfLessons"
        required
        label="Number Of Lessons"
        placeholder="nol"
        value={numberOfLessons}
        onChange={handleNumberOfLessonsChange}
      />

      <div>
        {lessons.map((form, index) => {
          return (
            <div key={index}>
              <input
                name="name"
                placeholder="Name"
                onChange={(event) => handleLessonsChange(event, index)}
                value={form.name}
              />
              <input
                name="length"
                placeholder="length"
                onChange={(event) => handleLessonsChange(event, index)}
                value={form.length}
              />
              <input
                name="url"
                placeholder="url"
                onChange={(event) => handleLessonsChange(event, index)}
                value={form.url}
              />
            </div>
          );
        })}
      </div>
      <button className="add-button" onClick={addLessons}>
        Add Lesson..
      </button>
          <button className="remove-button" onClick={removeLessons}>
        Remove Lessons..
      </button>
      <Button
        variant="contained"
        color="primary"
        onClick={updateItem}
      >
        Update Course
      </Button>
    </div>
  );
};

export default UpdateCourse;
