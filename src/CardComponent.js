import React, { useState } from "react";
import {
  makeStyles,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import map from "lodash/map";
import startCase from "lodash/startCase";
import reduce from "lodash/reduce";

const SMALL = 350;
const LARGE = "fit-content";

const CardComponent = (props) => {
  const {
    item,
    setIsReviewDialogOpen,
    setCardItem,
    user,
    setIsEditDialogOpen,
  } = props;
  const { type, name, itemAttributes, createdBy } = item;
  const { services, ratings, ...restAttributes } = itemAttributes;

  // const itemAttributes = {
  //   services,
  //   phoneNumber,
  //   address,
  //   ratings,
  //   reviews,
  //   workingHours,
  //   description,
  // }

  const [size, setSize] = useState(SMALL);

  const useStyles = makeStyles((theme) => ({
    card: {
      width: SMALL,
      height: size,
      margin: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    content: {
      overflow: "hidden",
    },
    title: {
      marginBottom: 4,
      fontSize: 14,
    },
    text: {
      marginBottom: 16,
    },
    actions: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  }));

  const classes = useStyles();

  const getSeperatedArray = (array) => {
    return array.join(", ");
  };

  const calculateRating = () => {
    if (ratings.length == 0) return "No ratings yet!";
    const ratingsSum = reduce(ratings, (sum, rating) => sum + rating);
    return (ratingsSum / ratings.length).toFixed(1);
  };

  const renderMendatoryAttributes = () => {
    return (
      <div>
        <Typography className={classes.title} color="textSecondary">
          {type}
        </Typography>
        <Typography className={classes.text} variant="h5">
          {name}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          {"Services"}
        </Typography>
        <Typography className={classes.text}>
          {getSeperatedArray(services)}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          {"Rating"}
        </Typography>
        <Typography className={classes.text} variant="h6">
          {calculateRating()}
        </Typography>
      </div>
    );
  };

  const renderReviews = (reviews) => {
    if (reviews.length == 0) return "No reviews yet!";
    if (reviews.length > 3) return getSeperatedArray(reviews.slice(0, 3));

    return getSeperatedArray(reviews);
  };

  const renderRestAttributes = () => {
    return map(restAttributes, (value, key) => {
      return (
        <div key={key}>
          <Typography className={classes.title} color="textSecondary">
            {startCase(key)}
          </Typography>
          <Typography className={classes.text}>
            {key == "reviews" ? renderReviews(value) : value}
          </Typography>
        </div>
      );
    });
  };

  const handleEdit = () => {
    setCardItem(item);
    setIsEditDialogOpen(true);
  };

  const handleReview = () => {
    setCardItem(item);
    setIsReviewDialogOpen(true);
  };

  const handleClick = () => {
    setSize(size == SMALL ? LARGE : SMALL);
  };

  const hasPermission = () => {
    return (
      user.userId.space === createdBy.userId.space &&
      user.userId.email === createdBy.userId.email
    );
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        {renderMendatoryAttributes()}
        {size == LARGE && renderRestAttributes()}
      </CardContent>
      <CardActions className={classes.actions}>
        {hasPermission() && (
          <Button onClick={handleEdit} color="primary">
            Edit Service Provider
          </Button>
        )}

        <Button
          style={{ marginLeft: 0, marginTop: 4 }}
          onClick={handleReview}
          color="primary"
        >
          Add Review
        </Button>
        <Button
          style={{ marginLeft: 0, marginTop: 4 }}
          onClick={handleClick}
          color="primary"
          variant="contained"
        >
          {size == SMALL ? "More details" : "Less details"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardComponent;