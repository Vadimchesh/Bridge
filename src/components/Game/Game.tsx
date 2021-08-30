import React, { FC } from 'react';
import {
  Button,
  Input,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import create from 'zustand';

import { IBalance, IRespons } from '../../models/common';
import backCard from '../../img/back-card.jpeg';
import { REQUESTS } from '../../consts/api';

const useStore = create<IBalance>((set) => ({
  count: 0,
  newGame: false,
  bid: '2',
  inc: () => set((state) => ({ count: state.count + +state.bid * 2 })),
  startGame: () => set((state) => ({ newGame: state.newGame })),
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
  let { count, inc, newGame, startGame, bid, changeBid } = useStore();

  const { isLoading, data, isSuccess } = useQuery<IRespons, Error>(
    'repoData',
    () =>
      fetch(
        `https://deckofcardsapi.com/api/deck/${REQUESTS.refreshDesk}/draw/?count=2`
      ).then((res) => res.json())
  );

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
        <div className={classes.game}>
          <img
            onClick={inc}
            src={!newGame ? backCard : data!.cards[0].image}
            height='314px'
            width='226px'
            alt='Card 1'
          ></img>
          <Button
            className={classes.button}
            variant='contained'
            color='secondary'
            size='large'
            onClick={startGame}
          >
            Играть
          </Button>
          <img
            onClick={inc}
            src={!newGame ? backCard : data!.cards[1].image}
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
