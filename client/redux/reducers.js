import axios from "axios";
import key from "../apiconfig";

const GET_DRINK = "GET_DRINK";
const GET_SAVED = "GET_SAVED";
const SAVE_DRINK = "SAVE_DRINK";
const REMOVE_DRINK = "REMOVE_DRINK";
const CLEAR_ALL = "CLEAR_ALL";

const SET_USER = "SET_USER";

export const _clearAll = () => {
  return {
    type: CLEAR_ALL,
  };
};

const _setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const _removeDrink = (drinks) => {
  return {
    type: REMOVE_DRINK,
    drinks,
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

export const setUser = (userData) => {
  return (dispatch) => {
    const user = {
      uid: userData.uid,
    };
    dispatch(_setUser(user));
  };
};
// export const removeDrink = (drink) => {
//   return async (dispatch) => {
//     try {
//       await axios.delete(
//         `https://us-central1-stackathon-eb2e6.cloudfunctions.net/app/api/drinks/${drink.id}`
//       );
//       dispatch(_removeDrink(drink));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

export const removeDrink = (drink, drinks, uid) => {
  return async (dispatch) => {
    try {
      const updated = drinks.filter((dr) => {
        return dr.name !== drink.name;
      });
      await axios.post(
        `https://us-central1-stackathon-eb2e6.cloudfunctions.net/app/api/users/${uid}/drinks`,
        updated
      );
      dispatch(_removeDrink(updated));
    } catch (error) {
      console.error(error);
    }
  };
};

export const saveDrink = (drink, uid, saved) => {
  return async (dispatch) => {
    try {
      const updatedSaved = [...saved, drink];
      await axios.post(
        `https://us-central1-stackathon-eb2e6.cloudfunctions.net/app/api/users/${uid}/drinks`,
        updatedSaved
      );
      dispatch(_saveDrink(drink));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSavedDrinks = (uid) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://us-central1-stackathon-eb2e6.cloudfunctions.net/app/api/users/${uid}/drinks`
      );
      console.log(response.data);
      if (response.data.drinks) {
        const saved = response.data.drinks.sort((a, b) => {
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
        console.log("resp", saved);
        dispatch(_getSavedDrinks(saved));
      } else {
        dispatch(_getSavedDrinks([]));
      }
    } catch (next) {
      console.error(next);
    }
  };
};

export const fetchDrink = () => {
  return async (dispatch) => {
    const options = {
      method: "GET",
      url: "https://the-cocktail-db.p.rapidapi.com/random.php",
      headers: {
        "x-rapidapi-key": key(),
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
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
        dispatch(_getDrink(drink));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

const initialState = {
  drink: {ingredients: [], measurements: []},
  saved: [],
  user: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRINK:
      return {...state, drink: action.drink};
    case GET_SAVED:
      return {...state, saved: action.drinks};
    case SAVE_DRINK:
      return {...state, saved: [...state.saved, action.drink]};
    // case REMOVE_DRINK:
    //   return {
    //     ...state,
    //     saved: state.saved.filter((drink) => drink.id !== action.drink.id),
    //   };
    case REMOVE_DRINK:
      return {
        ...state,
        saved: action.drinks,
      };
    case SET_USER:
      return {...state, user: action.user};
    case CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
}
