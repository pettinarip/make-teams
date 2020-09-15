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

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
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
  hello: Scalars['String'];
  me?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  confirmSignUp: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);


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
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
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
    Me(variables?: MeQueryVariables): Promise<MeQuery> {
      return withWrapper(() => client.request<MeQuery>(print(MeDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;