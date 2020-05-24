import faker from "faker";

let shareLink = {};

export function create() {
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
