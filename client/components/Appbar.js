import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Link, useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import CasinoIcon from "@material-ui/icons/Casino";
import LocalBarRoundedIcon from "@material-ui/icons/LocalBarRounded";
import {useAuth} from "../contexts/AuthContext";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import {setUser, _clearAll, fetchDrink} from "../redux/reducers";
import Badge from "@material-ui/core/Badge";

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
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  const {currentUser, signout} = useAuth();
  const history = useHistory();
  const {setUser, clearAll, saved, getDrink} = props;

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const findAnother = async () => {
    await getDrink();
  };
  const handleLogout = async () => {
    try {
      await signout().then(() => {
        toast.success("You are now logged out!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        clearAll();
        history.push("/login");
      });
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(error);
    }
  };

  const handleSavedClick = () => {
    if (saved.length > 0) {
      history.push("/saved");
    } else {
      toast.error(`You don't have any drinks saved!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    // <Container className={classes.root}>
    <AppBar position='fixed'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
          component={Link}
          to='/'
        >
          <LocalBarRoundedIcon />
        </IconButton>
        <Typography variant='h6' className={classes.title}>
          Drink Randomizer
        </Typography>
        {/* <Button color='inherit' component={Link} to='/saved'>
          Saved
        </Button> */}
        <Button
          className={classes.button}
          color='inherit'
          aria-label='search'
          onClick={() => {
            findAnother();
          }}
        >
          Find a New Drink
        </Button>
        {currentUser ? (
          <div>
            <Badge
              className={classes.badge}
              badgeContent={saved.length}
              color='secondary'
            >
              <Button color='inherit' onClick={handleSavedClick}>
                Saved
              </Button>
            </Badge>{" "}
            <Button color='inherit' onClick={handleLogout}>
              Log out
            </Button>
          </div>
        ) : (
          <div>
            <Button color='inherit' component={Link} to='/signup'>
              Sign up
            </Button>{" "}
            <Button color='inherit' component={Link} to='/login'>
              Log in
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
    // </Container>
  );
}
const mapStateToProps = (state) => {
  return {saved: state.saved};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    clearAll: () => dispatch(_clearAll()),
    getDrink: () => dispatch(fetchDrink()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);
