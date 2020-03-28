export type IPosition = {
  id: number;
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
}
