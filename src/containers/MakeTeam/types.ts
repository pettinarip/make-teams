import { Layout, Player, Position } from "../../graphql/API";

export interface IPlayer extends Player {}

export interface IPosition extends Pick<Position, "x" | "y"> {
  player?: Player;
}

export interface ILayout extends Pick<Layout, "id" | "name" | "createdAt"> {
  positions: Array<IPosition>;
  isCustom?: boolean;
}

export interface IShareTeam {
  id: string;
  name: string;
  positions: Array<IPosition>;
}
