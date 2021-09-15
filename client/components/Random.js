import React, {useState, useEffect} from 'react';
import {fetchDrink, fetchSavedDrinks, saveDrink} from '../redux/reducers';
import {makeStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Drink from './Drink';
import Container from '@material-ui/core/Container';
import {toast} from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useAuth} from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vw',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Random(props) {
  const {getDrink, drink, saveDrink, getSavedDrink, saved, uid} = props;
  const classes = useStyles();
  const handleSubmit = async () => {
    await getDrink();
  };

  const {currentUser} = useAuth();

  const saveClick = async (drink, uid) => {
    const exists = saved.filter((d) => {
      return d.name === drink.name;
    });
    if (exists.length === 0) {
      try {
        await saveDrink(drink, uid, saved).then(() => {
          toast.info('Drink saved!', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      } catch (err) {
        console.log(err);
        toast.error(`${err.message}`, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error('Drink is already saved!', {
        position: 'bottom-center',
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
    if (currentUser) {
      console.log(currentUser);
      getSavedDrink(uid);
    }
  }, []);

  return (
    <Container className='main-container'>
      {drink.glass !== undefined ? (
        <Drink
          drink={drink}
          saveDrink={saveClick}
          findAnother={handleSubmit}
          saved={saved}
          uid={uid}
        />
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
    uid: state.user.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDrink: () => dispatch(fetchDrink()),
    saveDrink: (drink, uid, saved) => dispatch(saveDrink(drink, uid, saved)),
    getSavedDrink: (uid) => dispatch(fetchSavedDrinks(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Random);
