import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type PositionInput = {
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type LayoutInput = {
  name: Scalars['String'];
  positions: Array<PositionInput>;
};

export type CustomLayoutInput = {
  name: Scalars['String'];
  positions: Array<PositionInput>;
};

export type PlayerInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  number: Scalars['Float'];
  nickname?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ConfirmSignUpInput = {
  email: Scalars['String'];
  code: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  layout?: Maybe<Layout>;
  layouts?: Maybe<Array<Layout>>;
  customLayout?: Maybe<CustomLayout>;
  customLayouts?: Maybe<Array<CustomLayout>>;
  player?: Maybe<Player>;
  players?: Maybe<Array<Player>>;
  me?: Maybe<User>;
};


export type QueryLayoutArgs = {
  id: Scalars['Int'];
};


export type QueryCustomLayoutArgs = {
  id: Scalars['Int'];
};


export type QueryPlayerArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLayout: Layout;
  createCustomLayout?: Maybe<CustomLayout>;
  createPlayer: Player;
  register: UserResponse;
  confirmSignUp: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
};


export type MutationCreateLayoutArgs = {
  input: LayoutInput;
};


export type MutationCreateCustomLayoutArgs = {
  input: CustomLayoutInput;
};


export type MutationCreatePlayerArgs = {
  input: PlayerInput;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
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
export const CreatePlayerDocument = gql`
    mutation CreatePlayer($firstName: String!, $lastName: String!, $number: Float!) {
  createPlayer(input: {firstName: $firstName, lastName: $lastName, number: $number}) {
    id
    firstName
    lastName
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
    ChangePassword(variables: ChangePasswordMutationVariables): Promise<ChangePasswordMutation> {
      return withWrapper(() => client.request<ChangePasswordMutation>(print(ChangePasswordDocument), variables));
    },
    ConfirmSignUp(variables: ConfirmSignUpMutationVariables): Promise<ConfirmSignUpMutation> {
      return withWrapper(() => client.request<ConfirmSignUpMutation>(print(ConfirmSignUpDocument), variables));
    },
    ForgotPasword(variables: ForgotPaswordMutationVariables): Promise<ForgotPaswordMutation> {
      return withWrapper(() => client.request<ForgotPaswordMutation>(print(ForgotPaswordDocument), variables));
    },
    Login(variables: LoginMutationVariables): Promise<LoginMutation> {
      return withWrapper(() => client.request<LoginMutation>(print(LoginDocument), variables));
    },
    Logout(variables?: LogoutMutationVariables): Promise<LogoutMutation> {
      return withWrapper(() => client.request<LogoutMutation>(print(LogoutDocument), variables));
    },
    SignUp(variables: SignUpMutationVariables): Promise<SignUpMutation> {
      return withWrapper(() => client.request<SignUpMutation>(print(SignUpDocument), variables));
    },
    CreatePlayer(variables: CreatePlayerMutationVariables): Promise<CreatePlayerMutation> {
      return withWrapper(() => client.request<CreatePlayerMutation>(print(CreatePlayerDocument), variables));
    },
    ListLayouts(variables?: ListLayoutsQueryVariables): Promise<ListLayoutsQuery> {
      return withWrapper(() => client.request<ListLayoutsQuery>(print(ListLayoutsDocument), variables));
    },
    Me(variables?: MeQueryVariables): Promise<MeQuery> {
      return withWrapper(() => client.request<MeQuery>(print(MeDocument), variables));
    },
    Players(variables?: PlayersQueryVariables): Promise<PlayersQuery> {
      return withWrapper(() => client.request<PlayersQuery>(print(PlayersDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;