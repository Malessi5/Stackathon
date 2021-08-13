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
      {drink ? (
        <div id="drink-container">
          <img src={drink.imgUrl} />
          <div id="drink-text">
            <h1>{drink.name}</h1>
            <p>
              {drink.alcoholic} {drink.category}
            </p>
            <p>Glass: {drink.glass}</p>
            <p>Instructions: {drink.instructions}</p>
            <h3>Ingredients</h3>
            <ol>
              {drink.ingredients.map((ing) => {
                return (
                  <li key={ing.key}>
                    {ing.measurement} {ing.name}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      ) : (
        <div>
          <div id="drink-button">
            <h3>Hit the button!</h3>
          </div>
        </div>
      )}
      <div className="search-bar">
        <form onSubmit={handleSubmit} autoComplete="off">
          <button type="submit">Find a Random Drink</button>
        </form>
      </div>
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
