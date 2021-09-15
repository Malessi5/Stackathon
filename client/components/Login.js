import * as React from 'react';
import {useRef, useState} from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import {LockOutlined} from '@material-ui/icons';
import {createTheme, ThemeProvider} from '@material-ui/core';
import {useAuth} from '../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';

function Copyright(props) {
  return (
    <Typography variant='body2' color='secondary' align='center' {...props}>
      {'Copyright © '}
      Drink Randomizer
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

// const useStyles = makeStyles({
//   main: {},
// });

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value).then(
        () => {
          toast.success('Login successful!', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          history.push('/');
        }
      );
      console.log(currentUser);
    } catch (err) {
      console.error(err);
      toast.error(`${err.message}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const {login, currentUser} = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlined />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Log in
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  variant='outlined'
                  inputRef={emailRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  variant='outlined'
                  inputRef={passwordRef}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              onClick={(e) => handleSubmit(e)}
              style={{marginTop: '15px', marginBottom: '5px'}}
              disabled={loading}
            >
              Login
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link to='/signup'>Need an Account? Sign up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright style={{marginTop: 5}} />
      </Container>
    </ThemeProvider>
  );
}
