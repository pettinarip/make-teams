// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const getLayout = /* GraphQL */ `
  query GetLayout($id: ID!) {
    getLayout(id: $id) {
      id
      name
      createdAt
      positions {
        items {
          id
          x
          y
        }
        nextToken
      }
    }
  }
`;
export const listLayouts = /* GraphQL */ `
  query ListLayouts(
    $filter: ModelLayoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLayouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        positions(limit: 11) {
          items {
            id
            x
            y
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPosition = /* GraphQL */ `
  query GetPosition($id: ID!) {
    getPosition(id: $id) {
      id
      x
      y
      layout {
        id
        name
        createdAt
        positions {
          nextToken
        }
      }
    }
  }
`;
export const listPositions = /* GraphQL */ `
  query ListPositions(
    $filter: ModelPositionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPositions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        x
        y
        layout {
          id
          name
          createdAt
        }
      }
      nextToken
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      firstName
      lastName
      number
      nickName
      age
      createdAt
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        number
        nickName
        age
        createdAt
      }
      nextToken
    }
  }
`;
