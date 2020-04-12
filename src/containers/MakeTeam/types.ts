export type ILayout = {
  id: number;
  name: string;
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
