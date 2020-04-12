// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const createLayout = /* GraphQL */ `
  mutation CreateLayout(
    $input: CreateLayoutInput!
    $condition: ModelLayoutConditionInput
  ) {
    createLayout(input: $input, condition: $condition) {
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
export const updateLayout = /* GraphQL */ `
  mutation UpdateLayout(
    $input: UpdateLayoutInput!
    $condition: ModelLayoutConditionInput
  ) {
    updateLayout(input: $input, condition: $condition) {
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
export const deleteLayout = /* GraphQL */ `
  mutation DeleteLayout(
    $input: DeleteLayoutInput!
    $condition: ModelLayoutConditionInput
  ) {
    deleteLayout(input: $input, condition: $condition) {
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
export const createPosition = /* GraphQL */ `
  mutation CreatePosition(
    $input: CreatePositionInput!
    $condition: ModelPositionConditionInput
  ) {
    createPosition(input: $input, condition: $condition) {
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
export const updatePosition = /* GraphQL */ `
  mutation UpdatePosition(
    $input: UpdatePositionInput!
    $condition: ModelPositionConditionInput
  ) {
    updatePosition(input: $input, condition: $condition) {
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
export const deletePosition = /* GraphQL */ `
  mutation DeletePosition(
    $input: DeletePositionInput!
    $condition: ModelPositionConditionInput
  ) {
    deletePosition(input: $input, condition: $condition) {
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
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
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
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
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
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
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
