import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchSavedDrinks, removeDrink} from '../redux/reducers';
import Drink from './Drink';
import SingleDrink from './SingleDrink';
import Container from '@material-ui/core/Container';

function Saved(props) {
  const {saved, getSavedDrink, removeDrink, uid} = props;
  useEffect(() => {
    getSavedDrink(uid);
  }, []);

  return saved ? (
    <Container disableGutters>
      {saved.map((drink, i) => {
        return (
          <SingleDrink
            drink={drink}
            key={i}
            removeDrink={removeDrink}
            saved={saved}
            uid={uid}
          />
        );
      })}
    </Container>
  ) : (
    <br />
  );
}

const mapStateToProps = (state) => {
  return {
    saved: state.saved,
    uid: state.user.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedDrink: (uid) => dispatch(fetchSavedDrinks(uid)),
    removeDrink: (drink, saved, uid) =>
      dispatch(removeDrink(drink, saved, uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Saved);
