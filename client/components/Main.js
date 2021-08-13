import React, { useState } from 'react';
import { fetchDrink } from '../redux/reducers';
import { connect } from 'react-redux';

function Main(props) {
  const { getDrink, drink } = props;

  const handleSubmit = async () => {
    await getDrink();
    console.log(drink);
  };

  return (
    <div className="main-container">
      <div className="search-bar">
        <h1>Random Drink</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <button type="submit">Search</button>
        </form>
      </div>
      {drink ? (
        <div>
          <img src={drink.imgUrl} />
          <h2>{drink.name}</h2>
          <p>{drink.alcoholic}</p>
          <p>{drink.category}</p>
          <p>Glass: {drink.glass}</p>
          <p>Instructions: {drink.instructions}</p>
          {drink.ingredients.map((ing) => {
            return (
              <p key={ing.key}>
                {ing.name} - {ing.measurement}
              </p>
            );
          })}
        </div>
      ) : (
        <div>
          <h3>Loading...</h3>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    drink: state.drink,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDrink: () => dispatch(fetchDrink()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
