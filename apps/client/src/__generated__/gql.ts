/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getUsers {\n    getUsers {\n      _id\n      fullName\n      title\n      teamName\n    }\n  }\n": types.GetUsersDocument,
    " query getFullReport($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      reviews {\n        manager {\n          grades {\n            maxRating\n            comment\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n        peers {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n        self {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n      }\n      status\n      summary\n    }\n  }\n": types.GetFullReportDocument,
    "\n  query getUserFullName($id: String) {\n    getUser(id: $id) {\n      fullName\n    }\n  }\n": types.GetUserFullNameDocument,
    "\n  query getUserObject($id: String) {\n    getUser(id: $id) {\n      photo\n      teamName\n      title\n      fullName\n    }\n  }\n": types.GetUserObjectDocument,
    "\n  query getEmployeeReport($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      summary\n    }\n  }\n": types.GetEmployeeReportDocument,
    "\n  query getUserByEmail($email: String!, $password: String!) {\n    getUserByEmail(email: $email, password: $password) {\n      fullName\n    }\n  }\n": types.GetUserByEmailDocument,
    "\n  mutation updateReport($targetId:String!, $cycleId:String!, $input:ReportInput!) {\n    updateReport(targetId:$targetId, cycleId:$cycleId, input:$input){\n      summary\n      reviews {\n        peers {\n          submitted\n          reviewerId\n          grades {\n            metric\n            rating\n            maxRating\n            comment\n          }\n        }\n        manager {\n          submitted\n          reviewerId\n          grades {\n            metric\n            rating\n            maxRating\n            comment\n          }\n        }\n      }\n    }\n  }": types.UpdateReportDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUsers {\n    getUsers {\n      _id\n      fullName\n      title\n      teamName\n    }\n  }\n"): (typeof documents)["\n  query getUsers {\n    getUsers {\n      _id\n      fullName\n      title\n      teamName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " query getFullReport($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      reviews {\n        manager {\n          grades {\n            maxRating\n            comment\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n        peers {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n        self {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n      }\n      status\n      summary\n    }\n  }\n"): (typeof documents)[" query getFullReport($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      reviews {\n        manager {\n          grades {\n            maxRating\n            comment\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n        peers {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n        self {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n      }\n      status\n      summary\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserFullName($id: String) {\n    getUser(id: $id) {\n      fullName\n    }\n  }\n"): (typeof documents)["\n  query getUserFullName($id: String) {\n    getUser(id: $id) {\n      fullName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserObject($id: String) {\n    getUser(id: $id) {\n      photo\n      teamName\n      title\n      fullName\n    }\n  }\n"): (typeof documents)["\n  query getUserObject($id: String) {\n    getUser(id: $id) {\n      photo\n      teamName\n      title\n      fullName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getEmployeeReport($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      summary\n    }\n  }\n"): (typeof documents)["\n  query getEmployeeReport($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      summary\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserByEmail($email: String!, $password: String!) {\n    getUserByEmail(email: $email, password: $password) {\n      fullName\n    }\n  }\n"): (typeof documents)["\n  query getUserByEmail($email: String!, $password: String!) {\n    getUserByEmail(email: $email, password: $password) {\n      fullName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateReport($targetId:String!, $cycleId:String!, $input:ReportInput!) {\n    updateReport(targetId:$targetId, cycleId:$cycleId, input:$input){\n      summary\n      reviews {\n        peers {\n          submitted\n          reviewerId\n          grades {\n            metric\n            rating\n            maxRating\n            comment\n          }\n        }\n        manager {\n          submitted\n          reviewerId\n          grades {\n            metric\n            rating\n            maxRating\n            comment\n          }\n        }\n      }\n    }\n  }"): (typeof documents)["\n  mutation updateReport($targetId:String!, $cycleId:String!, $input:ReportInput!) {\n    updateReport(targetId:$targetId, cycleId:$cycleId, input:$input){\n      summary\n      reviews {\n        peers {\n          submitted\n          reviewerId\n          grades {\n            metric\n            rating\n            maxRating\n            comment\n          }\n        }\n        manager {\n          submitted\n          reviewerId\n          grades {\n            metric\n            rating\n            maxRating\n            comment\n          }\n        }\n      }\n    }\n  }"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;