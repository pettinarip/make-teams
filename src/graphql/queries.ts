/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
            x
            y
          }
        }
      }
      nextToken
    }
  }
`;
export const getLayout = /* GraphQL */ `
  query GetLayout($id: ID!) {
    getLayout(id: $id) {
      id
      name
      createdAt
      positions {
        nextToken
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
      }
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
export const getShareLink = /* GraphQL */ `
  query GetShareLink($id: ID!) {
    getShareLink(id: $id) {
      id
      name
      createdBy
      layout {
        id
        name
        createdAt
      }
      positions {
        nextToken
      }
    }
  }
`;
export const getShareLinkPosition = /* GraphQL */ `
  query GetShareLinkPosition($id: ID!) {
    getShareLinkPosition(id: $id) {
      id
      createdBy
      position {
        id
        x
        y
      }
      player {
        id
        firstName
        lastName
        number
        nickName
        age
        createdBy
        createdAt
      }
      shareLink {
        id
        name
        createdBy
      }
    }
  }
`;
export const listShareLinkPositions = /* GraphQL */ `
  query ListShareLinkPositions(
    $filter: ModelShareLinkPositionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShareLinkPositions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdBy
      }
      nextToken
    }
  }
`;
