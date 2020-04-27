/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLayoutInput = {
  id?: string | null,
  name: string,
  createdAt?: string | null,
};

export type ModelLayoutConditionInput = {
  name?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelLayoutConditionInput | null > | null,
  or?: Array< ModelLayoutConditionInput | null > | null,
  not?: ModelLayoutConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateLayoutInput = {
  id: string,
  name?: string | null,
  createdAt?: string | null,
};

export type DeleteLayoutInput = {
  id?: string | null,
};

export type CreatePositionInput = {
  id?: string | null,
  x: number,
  y: number,
  positionLayoutId?: string | null,
};

export type ModelPositionConditionInput = {
  x?: ModelFloatInput | null,
  y?: ModelFloatInput | null,
  and?: Array< ModelPositionConditionInput | null > | null,
  or?: Array< ModelPositionConditionInput | null > | null,
  not?: ModelPositionConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePositionInput = {
  id: string,
  x?: number | null,
  y?: number | null,
  positionLayoutId?: string | null,
};

export type DeletePositionInput = {
  id?: string | null,
};

export type CreatePlayerInput = {
  id?: string | null,
  firstName: string,
  lastName?: string | null,
  number: number,
  nickName?: string | null,
  age?: number | null,
  createdBy?: string | null,
  createdAt?: string | null,
};

export type ModelPlayerConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  number?: ModelIntInput | null,
  nickName?: ModelStringInput | null,
  age?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPlayerConditionInput | null > | null,
  or?: Array< ModelPlayerConditionInput | null > | null,
  not?: ModelPlayerConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePlayerInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  number?: number | null,
  nickName?: string | null,
  age?: number | null,
  createdBy?: string | null,
  createdAt?: string | null,
};

export type DeletePlayerInput = {
  id?: string | null,
};

export type CreateShareLinkInput = {
  id?: string | null,
  name?: string | null,
  createdBy?: string | null,
  shareLinkLayoutId?: string | null,
};

export type ModelShareLinkConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelShareLinkConditionInput | null > | null,
  or?: Array< ModelShareLinkConditionInput | null > | null,
  not?: ModelShareLinkConditionInput | null,
};

export type UpdateShareLinkInput = {
  id: string,
  name?: string | null,
  createdBy?: string | null,
  shareLinkLayoutId?: string | null,
};

export type DeleteShareLinkInput = {
  id?: string | null,
};

export type CreateShareLinkPositionInput = {
  id?: string | null,
  createdBy?: string | null,
  shareLinkPositionShareLinkId?: string | null,
  shareLinkPositionPositionId?: string | null,
  shareLinkPositionPlayerId?: string | null,
};

export type ModelShareLinkPositionConditionInput = {
  and?: Array< ModelShareLinkPositionConditionInput | null > | null,
  or?: Array< ModelShareLinkPositionConditionInput | null > | null,
  not?: ModelShareLinkPositionConditionInput | null,
};

export type UpdateShareLinkPositionInput = {
  id: string,
  createdBy?: string | null,
  shareLinkPositionShareLinkId?: string | null,
  shareLinkPositionPositionId?: string | null,
  shareLinkPositionPlayerId?: string | null,
};

export type DeleteShareLinkPositionInput = {
  id?: string | null,
};

export type ModelLayoutFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelLayoutFilterInput | null > | null,
  or?: Array< ModelLayoutFilterInput | null > | null,
  not?: ModelLayoutFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelPositionFilterInput = {
  id?: ModelIDInput | null,
  x?: ModelFloatInput | null,
  y?: ModelFloatInput | null,
  and?: Array< ModelPositionFilterInput | null > | null,
  or?: Array< ModelPositionFilterInput | null > | null,
  not?: ModelPositionFilterInput | null,
};

export type ModelPlayerFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  number?: ModelIntInput | null,
  nickName?: ModelStringInput | null,
  age?: ModelIntInput | null,
  createdBy?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPlayerFilterInput | null > | null,
  or?: Array< ModelPlayerFilterInput | null > | null,
  not?: ModelPlayerFilterInput | null,
};

export type ModelShareLinkFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  createdBy?: ModelStringInput | null,
  and?: Array< ModelShareLinkFilterInput | null > | null,
  or?: Array< ModelShareLinkFilterInput | null > | null,
  not?: ModelShareLinkFilterInput | null,
};

export type ModelShareLinkPositionFilterInput = {
  id?: ModelIDInput | null,
  createdBy?: ModelStringInput | null,
  and?: Array< ModelShareLinkPositionFilterInput | null > | null,
  or?: Array< ModelShareLinkPositionFilterInput | null > | null,
  not?: ModelShareLinkPositionFilterInput | null,
};

export type CreateLayoutMutationVariables = {
  input: CreateLayoutInput,
  condition?: ModelLayoutConditionInput | null,
};

export type CreateLayoutMutation = {
  createLayout:  {
    __typename: "Layout",
    id: string,
    name: string,
    createdAt: string | null,
    positions:  {
      __typename: "ModelPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateLayoutMutationVariables = {
  input: UpdateLayoutInput,
  condition?: ModelLayoutConditionInput | null,
};

export type UpdateLayoutMutation = {
  updateLayout:  {
    __typename: "Layout",
    id: string,
    name: string,
    createdAt: string | null,
    positions:  {
      __typename: "ModelPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteLayoutMutationVariables = {
  input: DeleteLayoutInput,
  condition?: ModelLayoutConditionInput | null,
};

export type DeleteLayoutMutation = {
  deleteLayout:  {
    __typename: "Layout",
    id: string,
    name: string,
    createdAt: string | null,
    positions:  {
      __typename: "ModelPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreatePositionMutationVariables = {
  input: CreatePositionInput,
  condition?: ModelPositionConditionInput | null,
};

export type CreatePositionMutation = {
  createPosition:  {
    __typename: "Position",
    id: string,
    x: number,
    y: number,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
  } | null,
};

export type UpdatePositionMutationVariables = {
  input: UpdatePositionInput,
  condition?: ModelPositionConditionInput | null,
};

export type UpdatePositionMutation = {
  updatePosition:  {
    __typename: "Position",
    id: string,
    x: number,
    y: number,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
  } | null,
};

export type DeletePositionMutationVariables = {
  input: DeletePositionInput,
  condition?: ModelPositionConditionInput | null,
};

export type DeletePositionMutation = {
  deletePosition:  {
    __typename: "Position",
    id: string,
    x: number,
    y: number,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
  } | null,
};

export type CreatePlayerMutationVariables = {
  input: CreatePlayerInput,
  condition?: ModelPlayerConditionInput | null,
};

export type CreatePlayerMutation = {
  createPlayer:  {
    __typename: "Player",
    id: string,
    firstName: string,
    lastName: string | null,
    number: number,
    nickName: string | null,
    age: number | null,
    createdBy: string | null,
    createdAt: string | null,
  } | null,
};

export type UpdatePlayerMutationVariables = {
  input: UpdatePlayerInput,
  condition?: ModelPlayerConditionInput | null,
};

export type UpdatePlayerMutation = {
  updatePlayer:  {
    __typename: "Player",
    id: string,
    firstName: string,
    lastName: string | null,
    number: number,
    nickName: string | null,
    age: number | null,
    createdBy: string | null,
    createdAt: string | null,
  } | null,
};

export type DeletePlayerMutationVariables = {
  input: DeletePlayerInput,
  condition?: ModelPlayerConditionInput | null,
};

export type DeletePlayerMutation = {
  deletePlayer:  {
    __typename: "Player",
    id: string,
    firstName: string,
    lastName: string | null,
    number: number,
    nickName: string | null,
    age: number | null,
    createdBy: string | null,
    createdAt: string | null,
  } | null,
};

export type CreateShareLinkMutationVariables = {
  input: CreateShareLinkInput,
  condition?: ModelShareLinkConditionInput | null,
};

export type CreateShareLinkMutation = {
  createShareLink:  {
    __typename: "ShareLink",
    id: string,
    name: string | null,
    createdBy: string | null,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
    positions:  {
      __typename: "ModelShareLinkPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateShareLinkMutationVariables = {
  input: UpdateShareLinkInput,
  condition?: ModelShareLinkConditionInput | null,
};

export type UpdateShareLinkMutation = {
  updateShareLink:  {
    __typename: "ShareLink",
    id: string,
    name: string | null,
    createdBy: string | null,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
    positions:  {
      __typename: "ModelShareLinkPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteShareLinkMutationVariables = {
  input: DeleteShareLinkInput,
  condition?: ModelShareLinkConditionInput | null,
};

export type DeleteShareLinkMutation = {
  deleteShareLink:  {
    __typename: "ShareLink",
    id: string,
    name: string | null,
    createdBy: string | null,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
    positions:  {
      __typename: "ModelShareLinkPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateShareLinkPositionMutationVariables = {
  input: CreateShareLinkPositionInput,
  condition?: ModelShareLinkPositionConditionInput | null,
};

export type CreateShareLinkPositionMutation = {
  createShareLinkPosition:  {
    __typename: "ShareLinkPosition",
    id: string,
    createdBy: string | null,
    position:  {
      __typename: "Position",
      id: string,
      x: number,
      y: number,
    } | null,
    player:  {
      __typename: "Player",
      id: string,
      firstName: string,
      lastName: string | null,
      number: number,
      nickName: string | null,
      age: number | null,
      createdBy: string | null,
      createdAt: string | null,
    } | null,
    shareLink:  {
      __typename: "ShareLink",
      id: string,
      name: string | null,
      createdBy: string | null,
    } | null,
  } | null,
};

export type UpdateShareLinkPositionMutationVariables = {
  input: UpdateShareLinkPositionInput,
  condition?: ModelShareLinkPositionConditionInput | null,
};

export type UpdateShareLinkPositionMutation = {
  updateShareLinkPosition:  {
    __typename: "ShareLinkPosition",
    id: string,
    createdBy: string | null,
    position:  {
      __typename: "Position",
      id: string,
      x: number,
      y: number,
    } | null,
    player:  {
      __typename: "Player",
      id: string,
      firstName: string,
      lastName: string | null,
      number: number,
      nickName: string | null,
      age: number | null,
      createdBy: string | null,
      createdAt: string | null,
    } | null,
    shareLink:  {
      __typename: "ShareLink",
      id: string,
      name: string | null,
      createdBy: string | null,
    } | null,
  } | null,
};

export type DeleteShareLinkPositionMutationVariables = {
  input: DeleteShareLinkPositionInput,
  condition?: ModelShareLinkPositionConditionInput | null,
};

export type DeleteShareLinkPositionMutation = {
  deleteShareLinkPosition:  {
    __typename: "ShareLinkPosition",
    id: string,
    createdBy: string | null,
    position:  {
      __typename: "Position",
      id: string,
      x: number,
      y: number,
    } | null,
    player:  {
      __typename: "Player",
      id: string,
      firstName: string,
      lastName: string | null,
      number: number,
      nickName: string | null,
      age: number | null,
      createdBy: string | null,
      createdAt: string | null,
    } | null,
    shareLink:  {
      __typename: "ShareLink",
      id: string,
      name: string | null,
      createdBy: string | null,
    } | null,
  } | null,
};

export type ListLayoutsQueryVariables = {
  filter?: ModelLayoutFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLayoutsQuery = {
  listLayouts:  {
    __typename: "ModelLayoutConnection",
    items:  Array< {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetLayoutQueryVariables = {
  id: string,
};

export type GetLayoutQuery = {
  getLayout:  {
    __typename: "Layout",
    id: string,
    name: string,
    createdAt: string | null,
    positions:  {
      __typename: "ModelPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListPositionsQueryVariables = {
  filter?: ModelPositionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPositionsQuery = {
  listPositions:  {
    __typename: "ModelPositionConnection",
    items:  Array< {
      __typename: "Position",
      id: string,
      x: number,
      y: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPositionQueryVariables = {
  id: string,
};

export type GetPositionQuery = {
  getPosition:  {
    __typename: "Position",
    id: string,
    x: number,
    y: number,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
  } | null,
};

export type ListPlayersQueryVariables = {
  filter?: ModelPlayerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlayersQuery = {
  listPlayers:  {
    __typename: "ModelPlayerConnection",
    items:  Array< {
      __typename: "Player",
      id: string,
      firstName: string,
      lastName: string | null,
      number: number,
      nickName: string | null,
      age: number | null,
      createdBy: string | null,
      createdAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPlayerQueryVariables = {
  id: string,
};

export type GetPlayerQuery = {
  getPlayer:  {
    __typename: "Player",
    id: string,
    firstName: string,
    lastName: string | null,
    number: number,
    nickName: string | null,
    age: number | null,
    createdBy: string | null,
    createdAt: string | null,
  } | null,
};

export type ListShareLinksQueryVariables = {
  filter?: ModelShareLinkFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListShareLinksQuery = {
  listShareLinks:  {
    __typename: "ModelShareLinkConnection",
    items:  Array< {
      __typename: "ShareLink",
      id: string,
      name: string | null,
      createdBy: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetShareLinkQueryVariables = {
  id: string,
};

export type GetShareLinkQuery = {
  getShareLink:  {
    __typename: "ShareLink",
    id: string,
    name: string | null,
    createdBy: string | null,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
    positions:  {
      __typename: "ModelShareLinkPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type GetShareLinkPositionQueryVariables = {
  id: string,
};

export type GetShareLinkPositionQuery = {
  getShareLinkPosition:  {
    __typename: "ShareLinkPosition",
    id: string,
    createdBy: string | null,
    position:  {
      __typename: "Position",
      id: string,
      x: number,
      y: number,
    } | null,
    player:  {
      __typename: "Player",
      id: string,
      firstName: string,
      lastName: string | null,
      number: number,
      nickName: string | null,
      age: number | null,
      createdBy: string | null,
      createdAt: string | null,
    } | null,
    shareLink:  {
      __typename: "ShareLink",
      id: string,
      name: string | null,
      createdBy: string | null,
    } | null,
  } | null,
};

export type ListShareLinkPositionsQueryVariables = {
  filter?: ModelShareLinkPositionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListShareLinkPositionsQuery = {
  listShareLinkPositions:  {
    __typename: "ModelShareLinkPositionConnection",
    items:  Array< {
      __typename: "ShareLinkPosition",
      id: string,
      createdBy: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type getDataQuery = {
  listLayouts:  {
    __typename: "ModelLayoutConnection",
    items:  Array< {
      __typename: "Layout",
      id: string,
      name: string,
      positions:  {
        __typename: "ModelPositionConnection",
        items:  Array< {
          __typename: "Position",
          id: string,
          x: number,
          y: number,
        } | null > | null,
      } | null,
    } | null > | null,
  } | null,
  listPlayers:  {
    __typename: "ModelPlayerConnection",
    items:  Array< {
      __typename: "Player",
      id: string,
      firstName: string,
      lastName: string | null,
      number: number,
    } | null > | null,
  } | null,
};

export type OnCreateLayoutSubscription = {
  onCreateLayout:  {
    __typename: "Layout",
    id: string,
    name: string,
    createdAt: string | null,
    positions:  {
      __typename: "ModelPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateLayoutSubscription = {
  onUpdateLayout:  {
    __typename: "Layout",
    id: string,
    name: string,
    createdAt: string | null,
    positions:  {
      __typename: "ModelPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteLayoutSubscription = {
  onDeleteLayout:  {
    __typename: "Layout",
    id: string,
    name: string,
    createdAt: string | null,
    positions:  {
      __typename: "ModelPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreatePositionSubscription = {
  onCreatePosition:  {
    __typename: "Position",
    id: string,
    x: number,
    y: number,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
  } | null,
};

export type OnUpdatePositionSubscription = {
  onUpdatePosition:  {
    __typename: "Position",
    id: string,
    x: number,
    y: number,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
  } | null,
};

export type OnDeletePositionSubscription = {
  onDeletePosition:  {
    __typename: "Position",
    id: string,
    x: number,
    y: number,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
  } | null,
};

export type OnCreatePlayerSubscriptionVariables = {
  createdBy: string,
};

export type OnCreatePlayerSubscription = {
  onCreatePlayer:  {
    __typename: "Player",
    id: string,
    firstName: string,
    lastName: string | null,
    number: number,
    nickName: string | null,
    age: number | null,
    createdBy: string | null,
    createdAt: string | null,
  } | null,
};

export type OnUpdatePlayerSubscriptionVariables = {
  createdBy: string,
};

export type OnUpdatePlayerSubscription = {
  onUpdatePlayer:  {
    __typename: "Player",
    id: string,
    firstName: string,
    lastName: string | null,
    number: number,
    nickName: string | null,
    age: number | null,
    createdBy: string | null,
    createdAt: string | null,
  } | null,
};

export type OnDeletePlayerSubscriptionVariables = {
  createdBy: string,
};

export type OnDeletePlayerSubscription = {
  onDeletePlayer:  {
    __typename: "Player",
    id: string,
    firstName: string,
    lastName: string | null,
    number: number,
    nickName: string | null,
    age: number | null,
    createdBy: string | null,
    createdAt: string | null,
  } | null,
};

export type OnCreateShareLinkSubscriptionVariables = {
  createdBy: string,
};

export type OnCreateShareLinkSubscription = {
  onCreateShareLink:  {
    __typename: "ShareLink",
    id: string,
    name: string | null,
    createdBy: string | null,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
    positions:  {
      __typename: "ModelShareLinkPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateShareLinkSubscriptionVariables = {
  createdBy: string,
};

export type OnUpdateShareLinkSubscription = {
  onUpdateShareLink:  {
    __typename: "ShareLink",
    id: string,
    name: string | null,
    createdBy: string | null,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
    positions:  {
      __typename: "ModelShareLinkPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteShareLinkSubscriptionVariables = {
  createdBy: string,
};

export type OnDeleteShareLinkSubscription = {
  onDeleteShareLink:  {
    __typename: "ShareLink",
    id: string,
    name: string | null,
    createdBy: string | null,
    layout:  {
      __typename: "Layout",
      id: string,
      name: string,
      createdAt: string | null,
    } | null,
    positions:  {
      __typename: "ModelShareLinkPositionConnection",
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateShareLinkPositionSubscriptionVariables = {
  createdBy: string,
};

export type OnCreateShareLinkPositionSubscription = {
  onCreateShareLinkPosition:  {
    __typename: "ShareLinkPosition",
    id: string,
    createdBy: string | null,
    position:  {
      __typename: "Position",
      id: string,
      x: number,
      y: number,
    } | null,
    player:  {
      __typename: "Player",
      id: string,
      firstName: string,
      lastName: string | null,
      number: number,
      nickName: string | null,
      age: number | null,
      createdBy: string | null,
      createdAt: string | null,
    } | null,
    shareLink:  {
      __typename: "ShareLink",
      id: string,
      name: string | null,
      createdBy: string | null,
    } | null,
  } | null,
};

export type OnUpdateShareLinkPositionSubscriptionVariables = {
  createdBy: string,
};

export type OnUpdateShareLinkPositionSubscription = {
  onUpdateShareLinkPosition:  {
    __typename: "ShareLinkPosition",
    id: string,
    createdBy: string | null,
    position:  {
      __typename: "Position",
      id: string,
      x: number,
      y: number,
    } | null,
    player:  {
      __typename: "Player",
      id: string,
      firstName: string,
      lastName: string | null,
      number: number,
      nickName: string | null,
      age: number | null,
      createdBy: string | null,
      createdAt: string | null,
    } | null,
    shareLink:  {
      __typename: "ShareLink",
      id: string,
      name: string | null,
      createdBy: string | null,
    } | null,
  } | null,
};

export type OnDeleteShareLinkPositionSubscriptionVariables = {
  createdBy: string,
};

export type OnDeleteShareLinkPositionSubscription = {
  onDeleteShareLinkPosition:  {
    __typename: "ShareLinkPosition",
    id: string,
    createdBy: string | null,
    position:  {
      __typename: "Position",
      id: string,
      x: number,
      y: number,
    } | null,
    player:  {
      __typename: "Player",
      id: string,
      firstName: string,
      lastName: string | null,
      number: number,
      nickName: string | null,
      age: number | null,
      createdBy: string | null,
      createdAt: string | null,
    } | null,
    shareLink:  {
      __typename: "ShareLink",
      id: string,
      name: string | null,
      createdBy: string | null,
    } | null,
  } | null,
};
