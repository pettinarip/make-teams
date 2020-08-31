/* tslint:disable */
/* eslint-disable */
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
        x
        y
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
        x
        y
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
        x
        y
      }
    }
  }
`;
export const createCustomLayout = /* GraphQL */ `
  mutation CreateCustomLayout(
    $input: CreateCustomLayoutInput!
    $condition: ModelCustomLayoutConditionInput
  ) {
    createCustomLayout(input: $input, condition: $condition) {
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
export const updateCustomLayout = /* GraphQL */ `
  mutation UpdateCustomLayout(
    $input: UpdateCustomLayoutInput!
    $condition: ModelCustomLayoutConditionInput
  ) {
    updateCustomLayout(input: $input, condition: $condition) {
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
export const deleteCustomLayout = /* GraphQL */ `
  mutation DeleteCustomLayout(
    $input: DeleteCustomLayoutInput!
    $condition: ModelCustomLayoutConditionInput
  ) {
    deleteCustomLayout(input: $input, condition: $condition) {
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
      createdBy
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
      createdBy
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
      createdBy
      createdAt
    }
  }
`;
export const createShareLink = /* GraphQL */ `
  mutation CreateShareLink(
    $input: CreateShareLinkInput!
    $condition: ModelShareLinkConditionInput
  ) {
    createShareLink(input: $input, condition: $condition) {
      id
      name
      positions {
        x
        y
      }
      createdBy
    }
  }
`;
export const updateShareLink = /* GraphQL */ `
  mutation UpdateShareLink(
    $input: UpdateShareLinkInput!
    $condition: ModelShareLinkConditionInput
  ) {
    updateShareLink(input: $input, condition: $condition) {
      id
      name
      positions {
        x
        y
      }
      createdBy
    }
  }
`;
export const deleteShareLink = /* GraphQL */ `
  mutation DeleteShareLink(
    $input: DeleteShareLinkInput!
    $condition: ModelShareLinkConditionInput
  ) {
    deleteShareLink(input: $input, condition: $condition) {
      id
      name
      positions {
        x
        y
      }
      createdBy
    }
  }
`;
