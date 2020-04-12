// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateLayout = /* GraphQL */ `
  subscription OnCreateLayout {
    onCreateLayout {
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
export const onUpdateLayout = /* GraphQL */ `
  subscription OnUpdateLayout {
    onUpdateLayout {
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
export const onDeleteLayout = /* GraphQL */ `
  subscription OnDeleteLayout {
    onDeleteLayout {
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
        positions {
          nextToken
        }
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
        positions {
          nextToken
        }
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
        positions {
          nextToken
        }
      }
    }
  }
`;
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer {
    onCreatePlayer {
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
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer {
    onUpdatePlayer {
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
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer {
    onDeletePlayer {
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
