import React, { FC, useEffect, useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Game from '../../components/Game/Game';
import { isAuthenticated } from '../../models/common';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Main = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (!isAuthenticated) history.push('/login');
    else return;
  }, [isAuthenticated]);
  const startGame = () => {
    setGameStarted(true);
  };
  return (
    <>
      {!gameStarted ? (
        <div className={classes.paper}>
          <Typography variant='h1'>Кто выиграет?</Typography>
          <Typography variant='h3'>Сыграй игры и испытай удачу</Typography>
          <Button
            className={classes.button}
            variant='contained'
            color='secondary'
            size='large'
            onClick={startGame}
          >
            Играть
          </Button>
        </div>
      ) : (
        <Game />
      )}
    </>
  );
};

export default Main;
