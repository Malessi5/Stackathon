import React from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#247ba0",
    marginBottom: "15px",
    justifyContent: "space-evenly",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      {/* <ButtonGroup
        variant="contained"
        aria-label="contained primary button group"
        size="large"
      > */}
      <Button variant="contained" size="large" component={Link} to="/">
        Home
      </Button>

      <Button variant="contained" size="large" component={Link} to="/saved">
        Saved
      </Button>
      {/* </ButtonGroup> */}
    </Container>
  );
}
