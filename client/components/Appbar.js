import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import CasinoIcon from "@material-ui/icons/Casino";
import LocalBarRoundedIcon from "@material-ui/icons/LocalBarRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "25px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    // <Container className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          component={Link}
          to="/"
        >
          <LocalBarRoundedIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Drink Randomizer
        </Typography>
        <Button color="inherit" component={Link} to="/saved">
          Saved
        </Button>
      </Toolbar>
    </AppBar>
    // </Container>
  );
}
