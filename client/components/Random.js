import React, { useState, useEffect } from 'react';
import { fetchDrink, fetchSavedDrinks, saveDrink } from '../redux/reducers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Drink from './Drink';

function Random(props) {
  const { getDrink, drink, saveDrink, getSavedDrink, saved } = props;

  const handleSubmit = async () => {
    await getDrink();
  };

  const saveClick = async (drink) => {
    const exists = saved.filter((d) => {
      return d.name === drink.name;
    });
    if (exists.length == 0) {
      await saveDrink(drink);
    }
  };
  useEffect(async () => {
    if (drink.ingredients.length === 0) {
      await getDrink();
    }

    getSavedDrink();
  }, []);

  return (
    <div className="main-container">
      <Drink drink={drink} saveDrink={saveDrink} findAnother={handleSubmit} />

      {/* <div className="search-bar">
        <form onSubmit={handleSubmit} autoComplete="off">
          <button type="submit">Find Another</button>
        </form>
        <button onClick={() => saveClick(drink)}>Save</button>
      </div> */}
    </div>
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
