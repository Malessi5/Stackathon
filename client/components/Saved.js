import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSavedDrinks, removeDrink } from '../redux/reducers';
import Drink from './Drink';
import SingleDrink from './SingleDrink';

function Saved(props) {
  const { saved, getSavedDrink, removeDrink } = props;
  useEffect(() => {
    getSavedDrink();
  }, []);

  return saved ? (
    <div>
      {saved.map((drink) => {
        return (
          <SingleDrink drink={drink} key={drink.id} removeDrink={removeDrink} />
        );
        // return <Drink drink={drink} key={drink.id} />;
      })}
    </div>
  ) : (
    <br />
  );
}

const mapStateToProps = (state) => {
  return {
    saved: state.saved,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedDrink: () => dispatch(fetchSavedDrinks()),
    removeDrink: (drink) => dispatch(removeDrink(drink)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Saved);