import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ShareLinkPlayer = {
  __typename?: 'ShareLinkPlayer';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  number: Scalars['Float'];
  nickName?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
};

export type ShareLinkPosition = {
  __typename?: 'ShareLinkPosition';
  id: Scalars['ID'];
  x: Scalars['Float'];
  y: Scalars['Float'];
  player?: Maybe<ShareLinkPlayer>;
};

export type ShareLink = {
  __typename?: 'ShareLink';
  id: Scalars['ID'];
  name: Scalars['String'];
  snapshotUrl?: Maybe<Scalars['String']>;
  positions: Array<ShareLinkPosition>;
  createdAt: Scalars['String'];
};

export type Position = {
  __typename?: 'Position';
  id: Scalars['ID'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Layout = {
  __typename?: 'Layout';
  id: Scalars['ID'];
  name: Scalars['String'];
  positions: Array<Position>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CustomLayout = {
  __typename?: 'CustomLayout';
  id: Scalars['ID'];
  name: Scalars['String'];
  positions: Array<Position>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  number: Scalars['Float'];
  nickName?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
  userId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CustomLayoutResponse = {
  __typename?: 'CustomLayoutResponse';
  errors?: Maybe<Array<FieldError>>;
  customLayout?: Maybe<CustomLayout>;
};

export type PositionInput = {
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type LayoutInput = {
  name: Scalars['String'];
  positions: Array<PositionInput>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ConfirmSignUpInput = {
  email: Scalars['String'];
  code: Scalars['String'];
};

export type CustomLayoutInput = {
  name: Scalars['String'];
  positions: Array<PositionInput>;
};

export type EditCustomLayoutInput = {
  name: Scalars['String'];
  positions: Array<PositionInput>;
  id: Scalars['String'];
};

export type CreatePlayerInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  number: Scalars['Float'];
  nickname?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
};

export type EditPlayerInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  number: Scalars['Float'];
  nickname?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
};

export type SharePlayerInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  number: Scalars['Float'];
  nickName?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
};

export type SharePositionInput = {
  x: Scalars['Float'];
  y: Scalars['Float'];
  player?: Maybe<SharePlayerInput>;
};

export type ShareLinkInput = {
  name: Scalars['String'];
  positions: Array<SharePositionInput>;
};

export type Query = {
  __typename?: 'Query';
  layout?: Maybe<Layout>;
  layouts?: Maybe<Array<Layout>>;
  me?: Maybe<User>;
  customLayout?: Maybe<CustomLayout>;
  customLayouts?: Maybe<Array<CustomLayout>>;
  player?: Maybe<Player>;
  players?: Maybe<Array<Player>>;
  shareLink?: Maybe<ShareLink>;
};


export type QueryLayoutArgs = {
  id: Scalars['String'];
};


export type QueryCustomLayoutArgs = {
  id: Scalars['String'];
};


export type QueryPlayerArgs = {
  id: Scalars['String'];
};


export type QueryShareLinkArgs = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLayout: Layout;
  register: UserResponse;
  resendConfirmationCode: Scalars['Boolean'];
  confirmSignUp: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  createCustomLayout?: Maybe<CustomLayoutResponse>;
  editCustomLayout: Scalars['Boolean'];
  deleteCustomLayout: Scalars['Boolean'];
  createPlayer: Player;
  editPlayer: Scalars['Boolean'];
  deletePlayer: Scalars['Boolean'];
  createShareLink: ShareLink;
};


export type MutationCreateLayoutArgs = {
  input: LayoutInput;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationResendConfirmationCodeArgs = {
  email: Scalars['String'];
};


export type MutationConfirmSignUpArgs = {
  options: ConfirmSignUpInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateCustomLayoutArgs = {
  input: CustomLayoutInput;
};


export type MutationEditCustomLayoutArgs = {
  input: EditCustomLayoutInput;
};


export type MutationDeleteCustomLayoutArgs = {
  id: Scalars['String'];
};


export type MutationCreatePlayerArgs = {
  input: CreatePlayerInput;
};


export type MutationEditPlayerArgs = {
  input: EditPlayerInput;
};


export type MutationDeletePlayerArgs = {
  id: Scalars['String'];
};


export type MutationCreateShareLinkArgs = {
  input: ShareLinkInput;
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    )> }
  ) }
);

export type ConfirmSignUpMutationVariables = Exact<{
  email: Scalars['String'];
  code: Scalars['String'];
}>;


export type ConfirmSignUpMutation = (
  { __typename?: 'Mutation' }
  & { confirmSignUp: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type CreateLayoutMutationVariables = Exact<{
  name: Scalars['String'];
  positions: Array<PositionInput> | PositionInput;
}>;


export type CreateLayoutMutation = (
  { __typename?: 'Mutation' }
  & { createCustomLayout?: Maybe<(
    { __typename?: 'CustomLayoutResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, customLayout?: Maybe<(
      { __typename?: 'CustomLayout' }
      & Pick<CustomLayout, 'id' | 'name'>
      & { positions: Array<(
        { __typename?: 'Position' }
        & Pick<Position, 'x' | 'y'>
      )> }
    )> }
  )> }
);

export type CreatePlayerMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  number: Scalars['Float'];
}>;


export type CreatePlayerMutation = (
  { __typename?: 'Mutation' }
  & { createPlayer: (
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'firstName' | 'lastName'>
  ) }
);

export type CreateShareLinkMutationVariables = Exact<{
  input: ShareLinkInput;
}>;


export type CreateShareLinkMutation = (
  { __typename?: 'Mutation' }
  & { createShareLink: (
    { __typename?: 'ShareLink' }
    & Pick<ShareLink, 'id' | 'name' | 'createdAt'>
    & { positions: Array<(
      { __typename?: 'ShareLinkPosition' }
      & Pick<ShareLinkPosition, 'id' | 'x' | 'y'>
      & { player?: Maybe<(
        { __typename?: 'ShareLinkPlayer' }
        & Pick<ShareLinkPlayer, 'id' | 'firstName' | 'lastName' | 'number' | 'nickName' | 'age'>
      )> }
    )> }
  ) }
);

export type DeleteCustomLayoutMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCustomLayoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCustomLayout'>
);

export type DeletePlayerMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePlayerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePlayer'>
);

export type EditCustomLayoutMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
  positions: Array<PositionInput> | PositionInput;
}>;


export type EditCustomLayoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editCustomLayout'>
);

export type EditPlayerMutationVariables = Exact<{
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  number: Scalars['Float'];
}>;


export type EditPlayerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editPlayer'>
);

export type ForgotPaswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPaswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ResendConfirmationCodeMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResendConfirmationCodeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resendConfirmationCode'>
);

export type ShareLinkQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ShareLinkQuery = (
  { __typename?: 'Query' }
  & { shareLink?: Maybe<(
    { __typename?: 'ShareLink' }
    & Pick<ShareLink, 'id' | 'name' | 'createdAt' | 'snapshotUrl'>
    & { positions: Array<(
      { __typename?: 'ShareLinkPosition' }
      & Pick<ShareLinkPosition, 'id' | 'x' | 'y'>
      & { player?: Maybe<(
        { __typename?: 'ShareLinkPlayer' }
        & Pick<ShareLinkPlayer, 'id' | 'firstName' | 'lastName' | 'number' | 'nickName' | 'age'>
      )> }
    )> }
  )> }
);

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type ListLayoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListLayoutsQuery = (
  { __typename?: 'Query' }
  & { layouts?: Maybe<Array<(
    { __typename?: 'Layout' }
    & Pick<Layout, 'id' | 'name' | 'createdAt'>
    & { positions: Array<(
      { __typename?: 'Position' }
      & Pick<Position, 'x' | 'y'>
    )> }
  )>>, customLayouts?: Maybe<Array<(
    { __typename?: 'CustomLayout' }
    & Pick<CustomLayout, 'id' | 'name' | 'createdAt'>
    & { positions: Array<(
      { __typename?: 'Position' }
      & Pick<Position, 'x' | 'y'>
    )> }
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export type PlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayersQuery = (
  { __typename?: 'Query' }
  & { players?: Maybe<Array<(
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'firstName' | 'lastName' | 'number' | 'nickName' | 'age' | 'createdAt'>
  )>> }
);


export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    errors {
      field
      message
    }
    user {
      id
      email
    }
  }
}
    `;
export const ConfirmSignUpDocument = gql`
    mutation ConfirmSignUp($email: String!, $code: String!) {
  confirmSignUp(options: {email: $email, code: $code}) {
    errors {
      field
      message
    }
    user {
      id
      email
      createdAt
      updatedAt
    }
  }
}
    `;
export const CreateLayoutDocument = gql`
    mutation CreateLayout($name: String!, $positions: [PositionInput!]!) {
  createCustomLayout(input: {name: $name, positions: $positions}) {
    errors {
      field
      message
    }
    customLayout {
      id
      name
      positions {
        x
        y
      }
    }
  }
}
    `;
export const CreatePlayerDocument = gql`
    mutation CreatePlayer($firstName: String!, $lastName: String!, $number: Float!) {
  createPlayer(
    input: {firstName: $firstName, lastName: $lastName, number: $number}
  ) {
    id
    firstName
    lastName
  }
}
    `;
export const CreateShareLinkDocument = gql`
    mutation CreateShareLink($input: ShareLinkInput!) {
  createShareLink(input: $input) {
    id
    name
    createdAt
    positions {
      id
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
  }
}
    `;
export const DeleteCustomLayoutDocument = gql`
    mutation DeleteCustomLayout($id: String!) {
  deleteCustomLayout(id: $id)
}
    `;
export const DeletePlayerDocument = gql`
    mutation DeletePlayer($id: String!) {
  deletePlayer(id: $id)
}
    `;
export const EditCustomLayoutDocument = gql`
    mutation EditCustomLayout($id: String!, $name: String!, $positions: [PositionInput!]!) {
  editCustomLayout(input: {id: $id, name: $name, positions: $positions})
}
    `;
export const EditPlayerDocument = gql`
    mutation EditPlayer($id: String!, $firstName: String!, $lastName: String!, $number: Float!) {
  editPlayer(
    input: {id: $id, firstName: $firstName, lastName: $lastName, number: $number}
  )
}
    `;
export const ForgotPaswordDocument = gql`
    mutation ForgotPasword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(options: {email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      email
      createdAt
      updatedAt
    }
  }
}
    `;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export const ResendConfirmationCodeDocument = gql`
    mutation ResendConfirmationCode($email: String!) {
  resendConfirmationCode(email: $email)
}
    `;
export const ShareLinkDocument = gql`
    query ShareLink($id: String!) {
  shareLink(id: $id) {
    id
    name
    createdAt
    snapshotUrl
    positions {
      id
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
  }
}
    `;
export const SignUpDocument = gql`
    mutation SignUp($email: String!, $password: String!) {
  register(options: {email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      email
      createdAt
      updatedAt
    }
  }
}
    `;
export const ListLayoutsDocument = gql`
    query ListLayouts {
  layouts {
    id
    name
    createdAt
    positions {
      x
      y
    }
  }
  customLayouts {
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
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;
export const PlayersDocument = gql`
    query Players {
  players {
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

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ChangePassword(variables: ChangePasswordMutationVariables, requestHeaders?: Headers): Promise<ChangePasswordMutation> {
      return withWrapper(() => client.request<ChangePasswordMutation>(print(ChangePasswordDocument), variables, requestHeaders));
    },
    ConfirmSignUp(variables: ConfirmSignUpMutationVariables, requestHeaders?: Headers): Promise<ConfirmSignUpMutation> {
      return withWrapper(() => client.request<ConfirmSignUpMutation>(print(ConfirmSignUpDocument), variables, requestHeaders));
    },
    CreateLayout(variables: CreateLayoutMutationVariables, requestHeaders?: Headers): Promise<CreateLayoutMutation> {
      return withWrapper(() => client.request<CreateLayoutMutation>(print(CreateLayoutDocument), variables, requestHeaders));
    },
    CreatePlayer(variables: CreatePlayerMutationVariables, requestHeaders?: Headers): Promise<CreatePlayerMutation> {
      return withWrapper(() => client.request<CreatePlayerMutation>(print(CreatePlayerDocument), variables, requestHeaders));
    },
    CreateShareLink(variables: CreateShareLinkMutationVariables, requestHeaders?: Headers): Promise<CreateShareLinkMutation> {
      return withWrapper(() => client.request<CreateShareLinkMutation>(print(CreateShareLinkDocument), variables, requestHeaders));
    },
    DeleteCustomLayout(variables: DeleteCustomLayoutMutationVariables, requestHeaders?: Headers): Promise<DeleteCustomLayoutMutation> {
      return withWrapper(() => client.request<DeleteCustomLayoutMutation>(print(DeleteCustomLayoutDocument), variables, requestHeaders));
    },
    DeletePlayer(variables: DeletePlayerMutationVariables, requestHeaders?: Headers): Promise<DeletePlayerMutation> {
      return withWrapper(() => client.request<DeletePlayerMutation>(print(DeletePlayerDocument), variables, requestHeaders));
    },
    EditCustomLayout(variables: EditCustomLayoutMutationVariables, requestHeaders?: Headers): Promise<EditCustomLayoutMutation> {
      return withWrapper(() => client.request<EditCustomLayoutMutation>(print(EditCustomLayoutDocument), variables, requestHeaders));
    },
    EditPlayer(variables: EditPlayerMutationVariables, requestHeaders?: Headers): Promise<EditPlayerMutation> {
      return withWrapper(() => client.request<EditPlayerMutation>(print(EditPlayerDocument), variables, requestHeaders));
    },
    ForgotPasword(variables: ForgotPaswordMutationVariables, requestHeaders?: Headers): Promise<ForgotPaswordMutation> {
      return withWrapper(() => client.request<ForgotPaswordMutation>(print(ForgotPaswordDocument), variables, requestHeaders));
    },
    Login(variables: LoginMutationVariables, requestHeaders?: Headers): Promise<LoginMutation> {
      return withWrapper(() => client.request<LoginMutation>(print(LoginDocument), variables, requestHeaders));
    },
    Logout(variables?: LogoutMutationVariables, requestHeaders?: Headers): Promise<LogoutMutation> {
      return withWrapper(() => client.request<LogoutMutation>(print(LogoutDocument), variables, requestHeaders));
    },
    ResendConfirmationCode(variables: ResendConfirmationCodeMutationVariables, requestHeaders?: Headers): Promise<ResendConfirmationCodeMutation> {
      return withWrapper(() => client.request<ResendConfirmationCodeMutation>(print(ResendConfirmationCodeDocument), variables, requestHeaders));
    },
    ShareLink(variables: ShareLinkQueryVariables, requestHeaders?: Headers): Promise<ShareLinkQuery> {
      return withWrapper(() => client.request<ShareLinkQuery>(print(ShareLinkDocument), variables, requestHeaders));
    },
    SignUp(variables: SignUpMutationVariables, requestHeaders?: Headers): Promise<SignUpMutation> {
      return withWrapper(() => client.request<SignUpMutation>(print(SignUpDocument), variables, requestHeaders));
    },
    ListLayouts(variables?: ListLayoutsQueryVariables, requestHeaders?: Headers): Promise<ListLayoutsQuery> {
      return withWrapper(() => client.request<ListLayoutsQuery>(print(ListLayoutsDocument), variables, requestHeaders));
    },
    Me(variables?: MeQueryVariables, requestHeaders?: Headers): Promise<MeQuery> {
      return withWrapper(() => client.request<MeQuery>(print(MeDocument), variables, requestHeaders));
    },
    Players(variables?: PlayersQueryVariables, requestHeaders?: Headers): Promise<PlayersQuery> {
      return withWrapper(() => client.request<PlayersQuery>(print(PlayersDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;