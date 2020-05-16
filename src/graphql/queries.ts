/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLayout = /* GraphQL */ `
  query GetLayout($id: ID!) {
    getLayout(id: $id) {
      id
      name
      createdAt
      positions {
        nextToken
        items {
          id
          x
          y
        }
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
          nextToken
          items {
            id
            x
            y
          }
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
      createdBy
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
        createdBy
        createdAt
      }
      nextToken
    }
  }
`;
export const getShareLink = /* GraphQL */ `
  query GetShareLink($id: ID!) {
    getShareLink(id: $id) {
      id
      name
      positions
      createdBy
    }
  }
`;
