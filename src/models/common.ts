export interface IAuthenticated {
  isAuthenticated: boolean;
}

export const isAuthenticated = JSON.parse(localStorage.getItem('auth')!);

export interface IBalance {
  count: number;
  newGame: boolean;
  bid: string;
  inc: () => void;
  startGame: () => void;
  changeBid: (e: string) => void;
}

export interface ICard {
  image: string;
  value: string;
  suit: string;
  code: string;
}

export interface IRespons {
  success: boolean;
  cards: ICard[];
  deck_id: string;
  remaining: number;
}
