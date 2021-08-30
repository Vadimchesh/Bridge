import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const classes = useStyles();
  const history = useHistory();


  function Alert(props: any) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  function validateForm() {
    return login.length > 0 && password.length > 0;
  }

  const sucsessLogin = () => {
    localStorage.setItem('auth', JSON.stringify(true));
    history.push('/');
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login === 'admin' && password === '123456'
      ? sucsessLogin()
      : setError('Имя пользователя или пароль введены не верно');
  }

  return (
    <Container maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='login'
            label='Login'
            name='login'
            autoComplete='login'
            autoFocus
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={!validateForm()}
            className={classes.submit}
          >
            Sign In
          </Button>
          {error && (
            <Alert severity='error' onClick={() => setError('')}>
              {error}
            </Alert>
          )}
        </form>
      </div>
    </Container>
  );
};

export default Login;
