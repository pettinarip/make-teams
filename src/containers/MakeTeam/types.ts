export type ILayout = {
  id: number;
  name: string;
  createdAt: string;
  positions: Array<IPosition>;
};

export type IPosition = {
  x: number;
  y: number;
  player?: IPlayer;
};

export interface IPlayer {
  id: number;
  firstName: string;
  lastName: string;
  number: number;
  nickName?: string;
  age?: number;
  createdAt?: string;
}

export interface IShareTeam {
  id: number;
  name: string;
  positions: any;
}
