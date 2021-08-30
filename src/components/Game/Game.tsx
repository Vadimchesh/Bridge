import React, { FC, useEffect } from 'react';
import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import create from 'zustand';

import { IBalance, IRespons } from '../../models/common';
import backCard from '../../img/back-card.jpeg';
import { REQUESTS } from '../../consts/api';

const useStore = create<IBalance>((set) => ({
  count: 0,
  win: false,
  newGame: true,
  bid: '2',
  gain: () =>
    set((state) => ({
      count: state.count + +state.bid * 2,
      newGame: !state.newGame,
      win: !state.win,
    })),
  loosing: () =>
    set((state) => ({
      count: state.count - +state.bid * 2,
      newGame: !state.newGame,
      win: !state.win,
    })),
  startGame: () => set((state) => ({ newGame: !state.newGame })),
  changeBid: (e) => set(() => ({ bid: e })),
}));

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  game: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(3, 5, 2),
  },
}));

const Game: FC = () => {
  const classes = useStyles();
  let { count, newGame, startGame, bid, changeBid, win, gain, loosing } =
    useStore();
  const { isLoading, data, isSuccess } = useQuery<IRespons, Error>(
    'repoData',
    () =>
      fetch(
        `https://deckofcardsapi.com/api/deck/${REQUESTS.refreshDesk}/draw/?count=2`
      ).then((res) => res.json())
  );
  useEffect(() => {}, [win]);
  const getStartGame = (id: number) => {
    if (id === 0) {
      data?.cards[0].value! > data?.cards[1].value! ? gain() : loosing();
    } else {
      data?.cards[1].value! > data?.cards[2].value! ? gain() : loosing();
    }
  };

  const winOrLoose = () => {
    if (win) {
      return <Typography>Win</Typography>;
    } else if (!win) {
      return <Typography>Not win</Typography>;
    } else {
      return <Typography>nnnn</Typography>;
    }
  };

  if (isLoading) return <>Loading...</>;

  if (isSuccess)
    return (
      <div className={classes.paper}>
        <Typography variant='h3'>Balance: {count}</Typography>
        <TextField
          variant='outlined'
          defaultValue={bid}
          helperText='Ваша ставка'
          onChange={(e) => changeBid(e.target.value)}
        />
        {winOrLoose()}
        <div className={classes.game}>
          <img
            onClick={() => getStartGame(1)}
            src={newGame ? backCard : data!.cards[0].image}
            height='314px'
            width='226px'
            alt='Card 1'
          ></img>
          {!newGame ? (
            <Button
              className={classes.button}
              variant='contained'
              color='secondary'
              size='large'
              onClick={startGame}
            >
              Сыграть еще
            </Button>
          ) : (
            <>
              <Button
                onClick={() => getStartGame(0)}
                className={classes.button}
                variant='contained'
                color='secondary'
                size='large'
              >
                Слева
              </Button>
              <Button
                onClick={() => getStartGame(1)}
                className={classes.button}
                variant='contained'
                color='secondary'
                size='large'
              >
                Справа
              </Button>
            </>
          )}

          <img
            onClick={() => getStartGame(1)}
            src={newGame ? backCard : data!.cards[1].image}
            height='314px'
            width='226px'
            alt='Card 2'
          ></img>
        </div>
      </div>
    );

  return <div className={classes.paper}></div>;
};

export default Game;
