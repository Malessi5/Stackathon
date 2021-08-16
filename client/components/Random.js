import React, {useState, useEffect} from "react";
import {fetchDrink, fetchSavedDrinks, saveDrink} from "../redux/reducers";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Drink from "./Drink";
import Container from "@material-ui/core/Container";
import {toast} from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vw",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Random(props) {
  const {getDrink, drink, saveDrink, getSavedDrink, saved} = props;
  const classes = useStyles();
  const handleSubmit = async () => {
    await getDrink();
  };

  const saveClick = async (drink) => {
    const exists = saved.filter((d) => {
      return d.name === drink.name;
    });
    if (exists.length === 0) {
      await saveDrink(drink);
      toast.info("Drink saved!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Drink is already saved!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  useEffect(async () => {
    if (drink.ingredients.length === 0) {
      await getDrink();
    }

    getSavedDrink();
  }, []);

  return (
    <Container className="main-container">
      {drink.glass !== undefined ? (
        <Drink drink={drink} saveDrink={saveClick} findAnother={handleSubmit} />
      ) : (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    drink: state.drink,
    saved: state.saved,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDrink: () => dispatch(fetchDrink()),
    saveDrink: (drink) => dispatch(saveDrink(drink)),
    getSavedDrink: () => dispatch(fetchSavedDrinks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Random);
