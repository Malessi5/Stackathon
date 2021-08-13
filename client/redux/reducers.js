import axios from 'axios';
import key from '../apiconfig';

const GET_DRINK = 'GET_DRINK';

const _getDrink = (drink) => {
  return {
    type: GET_DRINK,
    drink,
  };
};

export const fetchDrink = () => {
  return async (dispatch) => {
    const options = {
      method: 'GET',
      url: 'https://the-cocktail-db.p.rapidapi.com/random.php',
      headers: {
        'x-rapidapi-key': key(),
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
      },
    };
    await axios
      .request(options)
      .then(function (response) {
        let ingredientsArr = [];
        let measurementsArr = [];
        for (let i = 1; i < 16; i++) {
          let measurement = `strMeasure${i}`;
          if (response.data.drinks[0][measurement]) {
            measurementsArr.push(response.data.drinks[0][measurement]);
          } else {
            break;
          }
        }
        for (let i = 1; i < 16; i++) {
          let ingredient = `strIngredient${i}`;
          if (response.data.drinks[0][ingredient]) {
            ingredientsArr.push({
              name: response.data.drinks[0][ingredient],
              measurement: measurementsArr[i - 1],
              key: i,
            });
          } else {
            break;
          }
        }
        const drink = {
          name: response.data.drinks[0].strDrink,
          alcoholic: response.data.drinks[0].strAlcoholic,
          category: response.data.drinks[0].strCategory,
          imgUrl: response.data.drinks[0].strDrinkThumb,
          glass: response.data.drinks[0].strGlass,
          ingredients: ingredientsArr,
          instructions: response.data.drinks[0].strInstructions,
        };
        console.log(response.data);
        dispatch(_getDrink(drink));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRINK:
      return { ...state, drink: action.drink };
    default:
      return state;
  }
}
