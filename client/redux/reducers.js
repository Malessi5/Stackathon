import axios from 'axios';
import key from '../apiconfig';

const GET_DRINK = 'GET_DRINK';
const GET_SAVED = 'GET_SAVED';
const SAVE_DRINK = 'SAVE_DRINK';
const REMOVE_DRINK = 'REMOVE_DRINK';

const _removeDrink = (drink) => {
  return {
    type: REMOVE_DRINK,
    drink,
  };
};

const _getDrink = (drink) => {
  return {
    type: GET_DRINK,
    drink,
  };
};

const _getSavedDrinks = (drinks) => {
  return {
    type: GET_SAVED,
    drinks,
  };
};

const _saveDrink = (drink) => {
  return {
    type: SAVE_DRINK,
    drink,
  };
};

export const removeDrink = (drink) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`./api/drinks/${drink.id}`);
      console.log('saved', response);
      dispatch(_removeDrink(drink));
    } catch (error) {
      console.error(error);
    }
  };
};

export const saveDrink = (drink) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('./api/drinks', drink);
      console.log('saved', response);
      dispatch(_saveDrink(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};
export const fetchSavedDrinks = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('./api/drinks');
      response.data.sort((a, b) => {
        let fa = a.name.toLowerCase();
        let fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      dispatch(_getSavedDrinks(response.data));
    } catch (next) {
      console.error(next);
    }
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
            ingredientsArr.push(response.data.drinks[0][ingredient]);
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
          measurements: measurementsArr,
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

const initialState = {
  drink: { ingredients: [], measurements: [] },
  saved: [],
};

export default function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case GET_DRINK:
      return { ...state, drink: action.drink };
    case GET_SAVED:
      return { ...state, saved: action.drinks };
    case SAVE_DRINK:
      return { ...state, saved: [...state.saved, action.drink] };
    case REMOVE_DRINK:
      return {
        ...state,
        saved: state.saved.filter((drink) => drink.id !== action.drink.id),
      };
    default:
      return state;
  }
}
