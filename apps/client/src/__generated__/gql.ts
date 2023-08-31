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
    "query getUsers {\n    getUsers {\n      _id\n      fullName\n      title\n      teamName\n    }\n  }": types.GetUsersDocument,
    " query getFullReport($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      status\n      summary\n      reviews {\n        manager {\n          grades {\n            maxRating\n            comment\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n        peers {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n        self {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n      }\n    }\n  }": types.GetFullReportDocument,
    "query getUserFullName($id: String) {\n    getUser(id: $id) {\n      fullName\n    }\n  }": types.GetUserFullNameDocument,
    "query getUserObject($id: String) {\n    getUser(id: $id) {\n      photo\n      teamName\n      title\n      fullName\n    }\n  }": types.GetUserObjectDocument,
    "query getEmployeeReport($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      summary\n    }\n  }": types.GetEmployeeReportDocument,
    "query getUserByEmail($email: String!, $password: String!) {\n    getUserByEmail(email: $email, password: $password) {\n      fullName\n    }\n  }": types.GetUserByEmailDocument,
    "query getCurrentCycle {\n    getCurrentCycle {\n      _id\n      title\n      startDate\n      endDate\n      peersPerTarget\n      nominationDeadline\n      reviewDeadline\n      reportDeadline\n    }\n  }": types.GetCurrentCycleDocument,
    "query getUserByName($fullName: String!) {\n    getUserByName(fullName: $fullName) {\n      _id\n    }\n  }": types.GetUserByNameDocument,
    " query getPeerReviews($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      reviews {\n        peers {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          _id\n          isDeclined\n          reviewerId\n          submitted\n        }\n      }\n    }\n  }": types.GetPeerReviewsDocument,
    "\n    mutation updateReport($targetId:String!, $cycleId:String!, $input:ReportInput!) {\n      updateReport(targetId:$targetId, cycleId:$cycleId, input:$input){\n        summary\n        reviews {\n          peers {\n            submitted\n            reviewerId\n            grades {\n              metric\n              rating\n              maxRating\n              comment\n            }\n          }\n          manager {\n            submitted\n            reviewerId\n          grades {\n            metric\n            rating\n            maxRating\n            comment\n          }\n        }\n          self {\n          submitted\n          reviewerId\n        grades {\n          metric\n          rating\n          maxRating\n          comment\n        }\n      }\n      }\n    }\n  }": types.UpdateReportDocument,
    "\n    mutation updatePeerReviews($targetId:String!, $cycleId:String!, $input:PeerUpdateInput!) {\n      updatePeerReview(targetId: $targetId, cycleId: $cycleId, input: $input) {\n        reviews {\n          peers {\n            reviewerId\n          }\n        }\n    }\n  }": types.UpdatePeerReviewsDocument,
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
export function gql(source: "query getUsers {\n    getUsers {\n      _id\n      fullName\n      title\n      teamName\n    }\n  }"): (typeof documents)["query getUsers {\n    getUsers {\n      _id\n      fullName\n      title\n      teamName\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " query getFullReport($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      status\n      summary\n      reviews {\n        manager {\n          grades {\n            maxRating\n            comment\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n        peers {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n        self {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n      }\n    }\n  }"): (typeof documents)[" query getFullReport($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      status\n      summary\n      reviews {\n        manager {\n          grades {\n            maxRating\n            comment\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n        peers {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n        self {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          isDeclined\n          reviewerId\n          submitted\n        }\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getUserFullName($id: String) {\n    getUser(id: $id) {\n      fullName\n    }\n  }"): (typeof documents)["query getUserFullName($id: String) {\n    getUser(id: $id) {\n      fullName\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getUserObject($id: String) {\n    getUser(id: $id) {\n      photo\n      teamName\n      title\n      fullName\n    }\n  }"): (typeof documents)["query getUserObject($id: String) {\n    getUser(id: $id) {\n      photo\n      teamName\n      title\n      fullName\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getEmployeeReport($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      summary\n    }\n  }"): (typeof documents)["query getEmployeeReport($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      summary\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getUserByEmail($email: String!, $password: String!) {\n    getUserByEmail(email: $email, password: $password) {\n      fullName\n    }\n  }"): (typeof documents)["query getUserByEmail($email: String!, $password: String!) {\n    getUserByEmail(email: $email, password: $password) {\n      fullName\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getCurrentCycle {\n    getCurrentCycle {\n      _id\n      title\n      startDate\n      endDate\n      peersPerTarget\n      nominationDeadline\n      reviewDeadline\n      reportDeadline\n    }\n  }"): (typeof documents)["query getCurrentCycle {\n    getCurrentCycle {\n      _id\n      title\n      startDate\n      endDate\n      peersPerTarget\n      nominationDeadline\n      reviewDeadline\n      reportDeadline\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query getUserByName($fullName: String!) {\n    getUserByName(fullName: $fullName) {\n      _id\n    }\n  }"): (typeof documents)["query getUserByName($fullName: String!) {\n    getUserByName(fullName: $fullName) {\n      _id\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " query getPeerReviews($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      reviews {\n        peers {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          _id\n          isDeclined\n          reviewerId\n          submitted\n        }\n      }\n    }\n  }"): (typeof documents)[" query getPeerReviews($targetId: String!, $cycleId: String!) {\n    getReport(targetId: $targetId, cycleId: $cycleId) {\n      _id {\n        targetId\n        cycleId\n      }\n      reviews {\n        peers {\n          grades {\n            comment\n            maxRating\n            metric\n            rating\n          }\n          _id\n          isDeclined\n          reviewerId\n          submitted\n        }\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation updateReport($targetId:String!, $cycleId:String!, $input:ReportInput!) {\n      updateReport(targetId:$targetId, cycleId:$cycleId, input:$input){\n        summary\n        reviews {\n          peers {\n            submitted\n            reviewerId\n            grades {\n              metric\n              rating\n              maxRating\n              comment\n            }\n          }\n          manager {\n            submitted\n            reviewerId\n          grades {\n            metric\n            rating\n            maxRating\n            comment\n          }\n        }\n          self {\n          submitted\n          reviewerId\n        grades {\n          metric\n          rating\n          maxRating\n          comment\n        }\n      }\n      }\n    }\n  }"): (typeof documents)["\n    mutation updateReport($targetId:String!, $cycleId:String!, $input:ReportInput!) {\n      updateReport(targetId:$targetId, cycleId:$cycleId, input:$input){\n        summary\n        reviews {\n          peers {\n            submitted\n            reviewerId\n            grades {\n              metric\n              rating\n              maxRating\n              comment\n            }\n          }\n          manager {\n            submitted\n            reviewerId\n          grades {\n            metric\n            rating\n            maxRating\n            comment\n          }\n        }\n          self {\n          submitted\n          reviewerId\n        grades {\n          metric\n          rating\n          maxRating\n          comment\n        }\n      }\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation updatePeerReviews($targetId:String!, $cycleId:String!, $input:PeerUpdateInput!) {\n      updatePeerReview(targetId: $targetId, cycleId: $cycleId, input: $input) {\n        reviews {\n          peers {\n            reviewerId\n          }\n        }\n    }\n  }"): (typeof documents)["\n    mutation updatePeerReviews($targetId:String!, $cycleId:String!, $input:PeerUpdateInput!) {\n      updatePeerReview(targetId: $targetId, cycleId: $cycleId, input: $input) {\n        reviews {\n          peers {\n            reviewerId\n          }\n        }\n    }\n  }"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;