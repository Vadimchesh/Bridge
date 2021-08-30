import React, { useEffect } from 'react';
import {
  AppBar,
  Button,
  CssBaseline,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../models/common';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarsTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const Header = () => {
  const classes = useStyles();
  const logout = () => {
    localStorage.setItem('auth', JSON.stringify(false));
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position='static'
        color='default'
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant='h6'
            color='inherit'
            noWrap
            className={classes.toolbarsTitle}
          >
            <Link to='/'> Brigth</Link>
          </Typography>
          {!isAuthenticated ? (
            <Link to='/login'>
              <Button
                color='primary'
                variant='outlined'
                className={classes.link}
              >
                Login
              </Button>
            </Link>
          ) : (
            <Button
              color='primary'
              variant='outlined'
              className={classes.link}
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
