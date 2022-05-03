import { Button, withStyles } from "@material-ui/core";

const WarnButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.light,
    },
  },
}))(Button);

export default WarnButton;