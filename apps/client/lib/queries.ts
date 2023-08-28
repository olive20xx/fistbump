import { gql } from "@apollo/client"

export const GET_USERS = gql`
  query Query {
    getUsers {
      _id
      fullName
      title
      teamName
    }
  }
`

export const GET_FULLREPORT = gql`
  query GetReport($targetId: String!, $cycleId: String!) {
    getReport(targetId: $targetId, cycleId: $cycleId) {
      _id {
        cycle
        target
      }
      summary
      reviews {
        peers {
          grades {
            comment
            maxRating
            metric
            rating
          }
          isDeclined
          reviewer
          submitted
        }
        self {
          grades {
            comment
            maxRating
            metric
            rating
          }
          isDeclined
          reviewer
          submitted
        }
        manager {
          grades {
            comment
            maxRating
            metric
            rating
          }
          isDeclined
          reviewer
          submitted
        }
      }
      status
    }
  }
`

export const GET_USER_FULLNAME_BY_ID = gql`
  query getUser($id: String) {
    getUser(id: $id) {
      fullName
    }
  }
`

export const GET_REPORT_FOR_EMPLOYEE = gql`
  query GetReport($targetId: String!, $cycleId: String!) {
    getReport(targetId: $targetId, cycleId: $cycleId) {
      _id {
        target
        cycle
      }
      summary
    }
  }
`