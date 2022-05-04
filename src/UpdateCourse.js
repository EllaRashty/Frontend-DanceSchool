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
  console.log(currentCourse);

  const { user } = props;
  const { userId, username, avatar, role } = user;
  const { space, email } = userId;

  const [itemid, setItemid] = useState("");
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

  const navigate = useNavigate();
  const classes = useStyles();

  const createItem = async () => {
    const response = await fetch(
      `http://localhost:8042/twins/items/${space}/${email}/${currentCourse.space}/${currentCourse.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: {
            space: currentCourse.space,
            id: currentCourse.id,
          },
          type: itemType,
          name: name,
          createdBy: {
            userId: {
              space: space,
              email: email,
            },
          },
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
      const result = await response.json();
      if (result.error) {
        alert("You can't create course!\nEnter different details!");
        return;
      }
      localStorage.setItem("item", JSON.stringify(result));
      // setUser(result);
      console.log(result);
      navigate("/home");
    }
  };

  const handleIdChange = (e) => {
    setItemid(e.target.value);
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
    <div>
      <Typography className={classes.title}>Update Course</Typography>
      <h3>{currentCourse.id}</h3>
      <TextField
        className={classes.field}
        id="item type"
        required
        label="Enter type"
        placeholder="tas"
        value={itemType}
        onChange={handletypeChange}
        // onKeyDown={handleKeyDown}
      />
      <TextField
        className={classes.field}
        id="name"
        required
        label="Enter name"
        placeholder="name"
        value={name}
        onChange={handleNameChange}
        // onKeyDown={handleKeyDown}
      />
      <TextField
        className={classes.field}
        id="typeOfDance"
        required
        label="Enter typeOfDance"
        placeholder="tod"
        value={typeOfDance}
        onChange={handlTypeOfDanceChange}
        // onKeyDown={handleKeyDown}
      />
      <TextField
        className={classes.field}
        id="workingHours"
        required
        label="Working Hours"
        placeholder="wh"
        value={workingHours}
        onChange={handleWorkingHoursChange}
        // onKeyDown={handleKeyDown}
      />

      <TextField
        className={classes.field}
        id="description"
        required
        label="description"
        placeholder="description"
        value={description}
        onChange={handleDescriptionChange}
        // onKeyDown={handleKeyDown}
      />

      <TextField
        className={classes.field}
        id="numberOfLessons"
        required
        label="number of lessons"
        placeholder="nol"
        value={numberOfLessons}
        onChange={handleNumberOfLessonsChange}
        // onKeyDown={handleKeyDown}
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

      <Button
        // disabled={!isInputsValid()}
        variant="contained"
        color="primary"
        onClick={createItem}
      >
        Update Course
      </Button>
    </div>
  );
};

export default UpdateCourse;
