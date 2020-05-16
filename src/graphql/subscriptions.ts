/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLayout = /* GraphQL */ `
  subscription OnCreateLayout {
    onCreateLayout {
      id
      name
      createdAt
      positions {
        nextToken
      }
    }
  }
`;
export const onUpdateLayout = /* GraphQL */ `
  subscription OnUpdateLayout {
    onUpdateLayout {
      id
      name
      createdAt
      positions {
        nextToken
      }
    }
  }
`;
export const onDeleteLayout = /* GraphQL */ `
  subscription OnDeleteLayout {
    onDeleteLayout {
      id
      name
      createdAt
      positions {
        nextToken
      }
    }
  }
`;
export const onCreatePosition = /* GraphQL */ `
  subscription OnCreatePosition {
    onCreatePosition {
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
export const onUpdatePosition = /* GraphQL */ `
  subscription OnUpdatePosition {
    onUpdatePosition {
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
export const onDeletePosition = /* GraphQL */ `
  subscription OnDeletePosition {
    onDeletePosition {
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
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer($createdBy: String!) {
    onCreatePlayer(createdBy: $createdBy) {
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
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer($createdBy: String!) {
    onUpdatePlayer(createdBy: $createdBy) {
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
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer($createdBy: String!) {
    onDeletePlayer(createdBy: $createdBy) {
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
export const onCreateShareLink = /* GraphQL */ `
  subscription OnCreateShareLink($createdBy: String!) {
    onCreateShareLink(createdBy: $createdBy) {
      id
      name
      positions
      createdBy
    }
  }
`;
export const onUpdateShareLink = /* GraphQL */ `
  subscription OnUpdateShareLink($createdBy: String!) {
    onUpdateShareLink(createdBy: $createdBy) {
      id
      name
      positions
      createdBy
    }
  }
`;
export const onDeleteShareLink = /* GraphQL */ `
  subscription OnDeleteShareLink($createdBy: String!) {
    onDeleteShareLink(createdBy: $createdBy) {
      id
      name
      positions
      createdBy
    }
  }
`;
