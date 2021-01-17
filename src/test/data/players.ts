import faker from "faker";

import { playersFixture } from "../../graphql/queries/fixtures/players";
import { IPlayer } from "../../containers/MakeTeam/types";

let players: Array<IPlayer> = [...playersFixture];

export function create({
  firstName,
  lastName,
  number,
}: {
  firstName: string;
  lastName: string;
  number: number;
}): IPlayer {
  const newPlayer: IPlayer = {
    id: faker.random.alphaNumeric(30),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    firstName,
    lastName,
    number,
    userId: 1,
  };

  players.push(newPlayer);

  return newPlayer;
}

export function edit({
  id,
  ...rest
}: {
  id: string;
  firstName: string;
  lastName: string;
  number: number;
}) {
  const index = players.findIndex((player) => player.id === id);
  players = [
    ...players.slice(0, index),
    { ...players[index], ...rest },
    ...players.slice(index + 1),
  ];
  return true;
}

export function remove({ id }: { id: string }): Array<IPlayer> {
  const index = players.findIndex((player) => player.id === id);
  players.splice(index, 1);
  return players;
}

export function reset() {
  players = [...playersFixture];
}

export function read(): Array<IPlayer> {
  return players;
}
