import faker from "faker";

import { IShareTeam } from "../../containers/MakeTeam/types";

let shareLink: Partial<IShareTeam> = {};

export function create(): Partial<IShareTeam> {
  const id = faker.random.alphaNumeric(30);
  shareLink = {
    ...shareLink,
    id,
  };

  return shareLink;
}

export function read() {
  return shareLink;
}
