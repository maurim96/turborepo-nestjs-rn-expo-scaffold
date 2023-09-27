import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  NonBinary = 'NON_BINARY',
  Other = 'OTHER'
}

export type Mutation = {
  __typename?: 'Mutation';
  validateUserAndUpdateDeviceToken: User;
};


export type MutationValidateUserAndUpdateDeviceTokenArgs = {
  deviceToken: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  deviceToken?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  onboardingCompleted: Scalars['Boolean']['output'];
  profilePicture?: Maybe<Scalars['String']['output']>;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, dateOfBirth?: any | null, deviceToken?: string | null, email: string, gender?: Gender | null, onboardingCompleted: boolean, profilePicture?: string | null, createdAt: any } };

export type ValidateUserAndUpdateDeviceTokenMutationVariables = Exact<{
  deviceToken: Scalars['String']['input'];
}>;


export type ValidateUserAndUpdateDeviceTokenMutation = { __typename?: 'Mutation', validateUserAndUpdateDeviceToken: { __typename?: 'User', id: string, email: string } };


export const CurrentUserDocument = gql`
    query CurrentUser {
  me {
    id
    firstName
    lastName
    dateOfBirth
    deviceToken
    email
    gender
    onboardingCompleted
    profilePicture
    createdAt
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const ValidateUserAndUpdateDeviceTokenDocument = gql`
    mutation validateUserAndUpdateDeviceToken($deviceToken: String!) {
  validateUserAndUpdateDeviceToken(deviceToken: $deviceToken) {
    id
    email
  }
}
    `;
export type ValidateUserAndUpdateDeviceTokenMutationFn = Apollo.MutationFunction<ValidateUserAndUpdateDeviceTokenMutation, ValidateUserAndUpdateDeviceTokenMutationVariables>;

/**
 * __useValidateUserAndUpdateDeviceTokenMutation__
 *
 * To run a mutation, you first call `useValidateUserAndUpdateDeviceTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateUserAndUpdateDeviceTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateUserAndUpdateDeviceTokenMutation, { data, loading, error }] = useValidateUserAndUpdateDeviceTokenMutation({
 *   variables: {
 *      deviceToken: // value for 'deviceToken'
 *   },
 * });
 */
export function useValidateUserAndUpdateDeviceTokenMutation(baseOptions?: Apollo.MutationHookOptions<ValidateUserAndUpdateDeviceTokenMutation, ValidateUserAndUpdateDeviceTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateUserAndUpdateDeviceTokenMutation, ValidateUserAndUpdateDeviceTokenMutationVariables>(ValidateUserAndUpdateDeviceTokenDocument, options);
      }
export type ValidateUserAndUpdateDeviceTokenMutationHookResult = ReturnType<typeof useValidateUserAndUpdateDeviceTokenMutation>;
export type ValidateUserAndUpdateDeviceTokenMutationResult = Apollo.MutationResult<ValidateUserAndUpdateDeviceTokenMutation>;
export type ValidateUserAndUpdateDeviceTokenMutationOptions = Apollo.BaseMutationOptions<ValidateUserAndUpdateDeviceTokenMutation, ValidateUserAndUpdateDeviceTokenMutationVariables>;