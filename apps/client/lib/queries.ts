import { gql } from '@/src/__generated__'

export const GET_USERS = gql(`
  query getUsers {
    getUsers {
      _id
      fullName
      title
      teamName
    }
  }
`)

export const GET_FULLREPORT =
  gql(` query getFullReport($targetId: String!, $cycleId: String!) {
    getReport(targetId: $targetId, cycleId: $cycleId) {
      _id {
        cycleId
        targetId
      }
      reviews {
        manager {
          grades {
            maxRating
            comment
            metric
            rating
          }
          isDeclined
          reviewerId
          submitted
        }
        peers {
          grades {
            comment
            maxRating
            metric
            rating
          }
          isDeclined
          reviewerId
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
          reviewerId
          submitted
        }
      }
      status
      summary
    }
  }
`)

export const GET_USER_FULLNAME_BY_ID = gql(`
  query getUserFullName($id: String) {
    getUser(id: $id) {
      fullName
    }
  }
`)

export const GET_USER_BY_ID = gql(`
  query getUserObject($id: String) {
    getUser(id: $id) {
      photo
      teamName
      title
      fullName
    }
  }
`)

export const GET_REPORT_FOR_EMPLOYEE = gql(`
  query getEmployeeReport($targetId: String!, $cycleId: String!) {
    getReport(targetId: $targetId, cycleId: $cycleId) {
      _id {
        targetId
        cycleId
      }
      summary
    }
  }
`)

export const GET_USER_BY_EMAIL = gql(`
  query getUserByEmail($email: String!, $password: String!) {
    getUserByEmail(email: $email, password: $password) {
      fullName
    }
  }
`)
