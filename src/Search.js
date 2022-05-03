import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import map from "lodash/map";
import {
  Button,
  TextField,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";

import CardComponent from "./CardComponent";
import CreateServiceFormComponent from "./CreateServiceFormComponent";
import { Search } from "@material-ui/icons";

// import "./cards-list-component.scss";

const SIZE = 6;
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

const SearchPage = (props) => {
  //   const { user } = props;

  const { user, type } = props;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isMoreAvailable, setIsMoreAvailable] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [clear, setClear] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [cardItem, setCardItem] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const search = async () => {
    const operationsEndPoint = `${process.env.API_ENDPOINT}/twins/operations`;

    const response = await fetch(operationsEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "search",
        invokedBy: { userId: user.userId },
        operationAttributes: { page, size: SIZE, type, searchValue },
      }),
    });

    const result = await response.json();

    setIsMoreAvailable(result.length >= SIZE && result.length !== 0);

    result && setData([...data, ...result]);
  };

  const handleSearch = () => {
    setData([]);
    setPage(0);
    setClear(!clear);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const renderCard = (item, index) => {
    return (
      <CardComponent
        item={item}
        key={index}
        setIsReviewDialogOpen={setIsReviewDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setCardItem={setCardItem}
        user={user}
      />
    );
  };

  const handleSubmit = async () => {
    const operationsEndPoint = `${process.env.API_ENDPOINT}/twins/operations`;

    const response = await fetch(operationsEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "rateServiceProvider",
        item: { itemId: cardItem.itemId },
        invokedBy: { userId: user.userId },
        operationAttributes: { page, size: SIZE, review, rating },
      }),
    });

    // const result = await response.json();

    setIsReviewDialogOpen(false);
  };

  const onRatingChange = (e) => {
    const value = e.target.value;
    if (value < 0 || value > 5) return;
    setRating(e.target.value);
  };

  const onReviewChange = (e) => {
    setReview(e.target.value);
  };

  const renderReviewDialog = () => {
    return (
      <Dialog
        open={isReviewDialogOpen}
        onClose={() => setIsReviewDialogOpen(false)}
      >
        <DialogTitle>Rate Service Provider</DialogTitle>
        <DialogContent>
          <DialogContentText>Tell us what you think:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="review"
            label="Review"
            type="text"
            fullWidth
            value={review}
            onChange={onReviewChange}
          />

          <TextField
            autoFocus
            margin="dense"
            id="review"
            label="Rate"
            type="number"
            fullWidth
            value={rating}
            onChange={onRatingChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsReviewDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderEditDialog = () => {
    return (
      <Dialog
        className="dialogWrapper"
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogContent>
          <CreateServiceFormComponent
            user={user}
            item={cardItem}
            setIsEditDialogOpen={setIsEditDialogOpen}
          ></CreateServiceFormComponent>
        </DialogContent>
      </Dialog>
    );
  };

  const renderCards = () => {
    if (data.length == 0)
      return (
        <Typography variant="h5" color="primary">
          No results!
        </Typography>
      );
    return map(data, (item, index) => renderCard(item, index));
  };

  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    search();
  }, [type, page, clear]);

  return (
    <div className="cards-list-component">
      {renderReviewDialog()}
      {renderEditDialog()}

      <div className="search-wrapper">
        <TextField
          className="input"
          value={searchValue}
          onChange={onSearchValueChange}
          label="Search"
          placeholder="Type something"
          variant="filled"
        ></TextField>

        <Button className="button" variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div className="card-list-wrapper">
        {renderCards()}
        {isMoreAvailable && (
          <div className="button-wrapper" onClick={loadMore}>
            <Button>Load more</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
