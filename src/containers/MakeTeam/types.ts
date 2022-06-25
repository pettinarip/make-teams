import {
  Layout,
  Player,
  Position,
  ShareLink,
  ShareLinkPosition,
} from "../../graphql/API";

export interface IPlayer extends Player {}

export interface IPosition extends Pick<Position, "x" | "y"> {
  player?: Player;
}

export interface ILayout extends Pick<Layout, "id" | "name" | "createdAt"> {
  positions: Array<IPosition>;
  isCustom?: boolean;
}

export interface IShareTeam extends ShareLink {}

export interface IShareLinkPosition extends ShareLinkPosition {}

export enum ItemType {
  POSITION = "position",
  PLAYER = "player",
}
