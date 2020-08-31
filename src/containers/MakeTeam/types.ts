export type ILayout = {
  id: string;
  name: string;
  createdAt: string;
  // Prop only used in the FE
  isCustom?: boolean;
  positions: Array<IPosition>;
};

export type IPosition = {
  x: number;
  y: number;
  player?: IPlayer;
};

export interface IPlayer {
  id: string;
  firstName: string;
  lastName: string;
  number: number;
  nickName?: string;
  age?: number;
  createdAt?: string;
}

export interface IShareTeam {
  id: string;
  name: string;
  positions: Array<IPosition>;
}
