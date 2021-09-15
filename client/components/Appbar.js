import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, useHistory} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CasinoIcon from '@material-ui/icons/Casino';
import LocalBarRoundedIcon from '@material-ui/icons/LocalBarRounded';
import {useAuth} from '../contexts/AuthContext';
import {toast} from 'react-toastify';
import {connect} from 'react-redux';
import {setUser} from '../redux/reducers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '25px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  const {currentUser, signout} = useAuth();
  const history = useHistory();
  const {setUser} = props;

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);
  const handleLogout = async () => {
    try {
      await signout().then(() => {
        toast.success('You are now logged out!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push('/');
      });
    } catch (error) {
      toast.error(`${error.message}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(error);
    }
  };

  return (
    // <Container className={classes.root}>
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
          component={Link}
          to='/'
        >
          <LocalBarRoundedIcon />
        </IconButton>
        <Typography variant='h6' className={classes.title}>
          Drink Randomizer
        </Typography>
        {/* <Button color='inherit' component={Link} to='/saved'>
          Saved
        </Button> */}
        {currentUser ? (
          <div>
            <Button color='inherit' component={Link} to='/saved'>
              Saved
            </Button>{' '}
            <Button color='inherit' onClick={handleLogout}>
              Log out
            </Button>
          </div>
        ) : (
          <div>
            <Button color='inherit' component={Link} to='/signup'>
              Sign up
            </Button>{' '}
            <Button color='inherit' component={Link} to='/login'>
              Log in
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
    // </Container>
  );
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);
