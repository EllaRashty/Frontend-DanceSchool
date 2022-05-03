import React, { useState } from "react";
import {
  FormControl,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import WarnButton from "./WarnButton";

// import "./create-service-form-component.scss";

const TYPES = {
  PROFESSIONAL: "Professional",
  BUSINESS: "Business",
};

export default function CreateServiceFormComponent(props) {
  const { user, item, setIsEditDialogOpen } = props;

  const [type, setType] = useState(item && item.type ? item.type : "");
  const [name, setName] = useState(item && item.name ? item.name : "");
  const [service1, setService1] = useState(
    item && item.itemAttributes.services[0]
      ? item.itemAttributes.services[0]
      : ""
  );
  const [service2, setService2] = useState(
    item && item.itemAttributes.services[1]
      ? item.itemAttributes.services[1]
      : ""
  );
  const [service3, setService3] = useState(
    item && item.itemAttributes.services[2]
      ? item.itemAttributes.services[2]
      : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    item && item.itemAttributes.phoneNumber
      ? item.itemAttributes.phoneNumber
      : ""
  );
  const [address, setAddress] = useState(
    item && item.itemAttributes.address ? item.itemAttributes.address : ""
  );
  const [workingHours, setWorkingHours] = useState(
    item && item.itemAttributes.workingHours
      ? item.itemAttributes.workingHours
      : ""
  );
  const [description, setDescription] = useState(
    item && item.itemAttributes.description
      ? item.itemAttributes.description
      : ""
  );

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleService1Change = (e) => {
    setService1(e.target.value);
  };

  const handleService2Change = (e) => {
    setService2(e.target.value);
  };

  const handleService3Change = (e) => {
    setService3(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleWorkingHoursChange = (e) => {
    setWorkingHours(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleClick = async () => {
    const services = [];
    service1 && services.push(service1);
    service2 && services.push(service2);
    service3 && services.push(service3);

    const serviceProvider = {
      type,
      name,
      services,
      phoneNumber,
      address,
      workingHours,
      description,
    };

    const operationsEndPoint = `${process.env.API_ENDPOINT}/twins/operations`;

    const response = await fetch(operationsEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: item ? "updateServiceProvider" : "createNewServiceProvider",
        invokedBy: { userId: user.userId },
        item,
        operationAttributes: { ...serviceProvider },
      }),
    });

    const result = await response.json();

    if (result)
      alert(
        item ? "Service edited successfully!" : "Service added successfully!"
      );

    setIsEditDialogOpen && setIsEditDialogOpen(false);
  };

  const handleClear = () => {
    setType("");
    setName("");
    setService1("");
    setService2("");
    setService3("");
    setPhoneNumber("");
    setAddress("");
    setWorkingHours("");
    setDescription("");
  };

  const isDisabled = () => {
    return !type || !name || !service1 || !phoneNumber;
  };

  return (
    <div
      className="create-service-form-component"
      style={!item ? { paddingTop: 80 } : null}
    >
      <FormControl className="form-wrapper">
        <TextField
          className="input"
          value={type}
          onChange={handleTypeChange}
          variant="filled"
          label="Type"
          select
          error={!type}
          required
        >
          <MenuItem value={TYPES.PROFESSIONAL}>{TYPES.PROFESSIONAL}</MenuItem>
          <MenuItem value={TYPES.BUSINESS}>{TYPES.BUSINESS}</MenuItem>
        </TextField>

        <TextField
          className="input"
          value={name}
          label="Name"
          onChange={handleNameChange}
          required
          variant="filled"
          error={!name}
        ></TextField>

        <TextField
          className="input"
          value={service1}
          label="Service No.1"
          onChange={handleService1Change}
          required
          variant="filled"
          error={!service1}
        ></TextField>

        <TextField
          className="input"
          value={service2}
          label="Service No.2"
          onChange={handleService2Change}
          variant="filled"
        ></TextField>

        <TextField
          className="input"
          value={service3}
          label="Service No.3"
          onChange={handleService3Change}
          variant="filled"
        ></TextField>

        <TextField
          className="input"
          value={phoneNumber}
          label="Phone Number"
          onChange={handlePhoneNumberChange}
          variant="filled"
          error={!phoneNumber}
          required
        ></TextField>

        <TextField
          className="input"
          value={address}
          label="Address"
          onChange={handleAddressChange}
          variant="filled"
        ></TextField>

        <TextField
          className="input"
          value={workingHours}
          label="Working Hours"
          onChange={handleWorkingHoursChange}
          variant="filled"
        ></TextField>

        <TextField
          className="input"
          value={description}
          label="Description"
          onChange={handleDescriptionChange}
          variant="filled"
        ></TextField>
      </FormControl>
      <div className="actions">
        <WarnButton
          className="button"
          onClick={handleClear}
          variant="contained"
        >
          Clear Fields
        </WarnButton>
        <Button
          className="button"
          onClick={handleClick}
          variant="contained"
          color="primary"
          disabled={isDisabled()}
        >
          {item ? "Edit Service" : "Add Service"}
        </Button>
        {isDisabled() && (
          <Typography color="error">* Required Fields</Typography>
        )}
      </div>
    </div>
  );
}