import React, { useState, useEffect } from 'react';
// import { fetchDrink, fetchSavedDrinks, saveDrink } from '../redux/reducers';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Main(props) {
  const classes = useStyles();
  return (
    <div className="home-container">
      <div>
        <Link to="/random">
          <Fab variant="extended">
            <SearchIcon className={classes.extendedIcon} />
            Find A Drink
          </Fab>
        </Link>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     drink: state.drink,
//     saved: state.saved,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getDrink: () => dispatch(fetchDrink()),
//     saveDrink: (drink) => dispatch(saveDrink(drink)),
//     getSavedDrink: () => dispatch(fetchSavedDrinks()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Main);
