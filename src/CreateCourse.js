import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
  },
  field: {
    width: "60%",
    margin: 10,
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

const CreateCourse = (props) => {
  const { user } = props;
  const { userId, username, avatar, role } = user;
  const { space, email } = userId;

  const [itemType, setItemType] = useState("");
  const [name, setName] = useState("");
  const [itemImg, setItemImg] = useState("");

  const [typeOfDance, setTypeOfDance] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [description, setDescription] = useState("");
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

  const isInputsValid = () => {
    if (itemType === "") {
      // alert("The course must have a level");
      return false;
    }
    if (name === "") {
      // alert("The course must have a course name");
      return false;
    }
    if (typeOfDance === "") {
      // alert("The course must contain type of dance");
      return false;
    }
    if (description === "") {
      // alert("The course must have a description");
      return false;
    }
    return true;
  };

  const createItem = async () => {
    if (itemImg === "") {
      alert("Default course image defined");
      setItemImg(
        "https://i.gifer.com/origin/46/460faecade416bbf19a57c19152e93d5.gif         "
      );
    }
    if (lessons.length !== 0) {
      const response = await fetch(
        `http://localhost:8042/twins/items/${space}/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
            img: itemImg,
            numberOfLessons: lessons.length,
            lessons: lessons,
          }),
        }
      );

      if (!!response) {
        const result = await response.json();
        if (result.error) {
          alert("The lesson must contain a link!");
          return;
        }
        localStorage.setItem("item", JSON.stringify(result));
        console.log(result);
        navigate("/home");
      }
    } else {
      alert("The course must contain at least one lesson");
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

  const handleitemImgChange = (e) => {
    setItemImg(e.target.value);
  };

  const handleWorkingHoursChange = (e) => {
    setWorkingHours(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLessonsChange = (event, index) => {
    let data = [...lessons];
    data[index][event.target.name] = event.target.value;
    setLessons(data);
  };

  return (
    <div className="create-cours-page">
      <Typography className={classes.title}>Create A New Course</Typography>
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
        id="item img"
        required
        label="Enter IMG URL"
        placeholder="tas"
        value={itemImg}
        onChange={handleitemImgChange}
      />
      <TextField
        className={classes.field}
        id="workingHours"
        required
        label="Duration of the course"
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

      <div>
        {lessons.map((form, index) => {
          return (
            <div key={index}>
              <input
                name="name"
                placeholder="Name"
                onChange={(event) => handleLessonsChange(event, index)}
                value={form.name}
                style={{ margin: 5, borderRadius: 10, padding: 9, width: 160 }}
              />
              <input
                name="length"
                placeholder="length"
                onChange={(event) => handleLessonsChange(event, index)}
                value={form.length}
                style={{ margin: 5, borderRadius: 10, padding: 9, width: 80 }}
              />
              <input
                name="url"
                placeholder="url"
                onChange={(event) => handleLessonsChange(event, index)}
                value={form.url}
                style={{ margin: 5, borderRadius: 10, padding: 9, width: 230 }}
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
        disabled={!isInputsValid()}
        variant="contained"
        color="primary"
        onClick={createItem}
      >
        Create Course
      </Button>
    </div>
  );
};

export default CreateCourse;
