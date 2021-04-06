import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken?: Maybe<Scalars['String']>;
};

export type Consumption = {
  __typename?: 'Consumption';
  drink?: Maybe<Drink>;
  id?: Maybe<Scalars['ID']>;
  time?: Maybe<Scalars['DateTime']>;
};


export type Drink = {
  __typename?: 'Drink';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  percentage?: Maybe<Scalars['Float']>;
  volume?: Maybe<Scalars['Float']>;
};

/** The available genders. */
export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type Mutation = {
  __typename?: 'Mutation';
  signIn?: Maybe<Scalars['Boolean']>;
  signOut?: Maybe<Scalars['Boolean']>;
  signUp?: Maybe<Scalars['Boolean']>;
};


export type MutationSignInArgs = {
  credentials: SignInInput;
};


export type MutationSignUpArgs = {
  user: SignUpInput;
};

export type Participant = {
  __typename?: 'Participant';
  consumptions?: Maybe<Array<Maybe<Consumption>>>;
  currentBAC?: Maybe<Scalars['Float']>;
  joinedDate?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  allConsumptions?: Maybe<Array<Maybe<Consumption>>>;
  allDrinks?: Maybe<Array<Maybe<Drink>>>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  me?: Maybe<User>;
  mySessions?: Maybe<Array<Maybe<Session>>>;
};

export type Session = {
  __typename?: 'Session';
  code?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  participants?: Maybe<Array<Maybe<Participant>>>;
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpInput = {
  birthDate: Scalars['String'];
  email: Scalars['String'];
  gender: Gender;
  name: Scalars['String'];
  password: Scalars['String'];
  weight: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  birthDate?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Float']>;
};

export type SignUpMutationVariables = Exact<{
  user: SignUpInput;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signUp'>
);


export const SignUpDocument = gql`
    mutation SignUp($user: SignUpInput!) {
  signUp(user: $user)
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;