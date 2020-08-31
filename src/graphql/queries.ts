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
        x
        y
      }
    }
  }
`;
export const listLayouts = /* GraphQL */ `
  query ListLayouts(
    $filterLayout: ModelLayoutFilterInput
    $filterCustomLayout: ModelCustomLayoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLayouts(filter: $filterLayout, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        positions {
          x
          y
        }
      }
      nextToken
    }
    listCustomLayouts(
      filter: $filterCustomLayout
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        createdBy
        createdAt
        positions {
          x
          y
        }
      }
      nextToken
    }
  }
`;
export const getCustomLayout = /* GraphQL */ `
  query GetCustomLayout($id: ID!) {
    getCustomLayout(id: $id) {
      id
      name
      createdBy
      createdAt
      positions {
        x
        y
      }
    }
  }
`;
export const listCustomLayouts = /* GraphQL */ `
  query ListCustomLayouts(
    $filter: ModelCustomLayoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomLayouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdBy
        createdAt
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
      positions {
        x
        y
        player {
          id
          firstName
          lastName
          number
          nickName
          age
        }
      }
      createdBy
    }
  }
`;
export const listShareLinks = /* GraphQL */ `
  query ListShareLinks(
    $filter: ModelShareLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShareLinks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdBy
      }
      nextToken
    }
  }
`;
