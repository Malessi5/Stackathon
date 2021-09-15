import * as React from 'react';
import {useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
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
import {toast} from 'react-toastify';

function Copyright(props) {
  return (
    <Typography variant='body2' color='secondary' align='center' {...props}>
      {'Copyright © '}
      Drink Randomizer {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (passwordRef.current.value === passwordConfirmRef.current.value) {
      try {
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value).then(
          () => {
            toast.success('Sign up successful!', {
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
    } else {
      toast.error('Passwords do not match!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {signup} = useAuth();
  const history = useHistory();

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
            Sign up
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='passwordConfirm'
                  label='Password Confirmation'
                  type='password'
                  id='passwordConfirm'
                  autoComplete='new-password'
                  variant='outlined'
                  inputRef={passwordConfirmRef}
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
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link to='/login'>Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright style={{marginTop: 25}} />
      </Container>
    </ThemeProvider>
  );
}
