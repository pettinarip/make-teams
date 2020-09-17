import { Player as IPlayer } from "../../graphql/API";

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

export interface IShareTeam {
  id: string;
  name: string;
  positions: Array<IPosition>;
}
