import { gql } from '@/src/__generated__'

export const queries = {
  GET_USERS: gql(`query getUsers {
    getUsers {
      _id
      fullName
      title
      teamName
      email
    }
  }`),

  GET_FULL_REPORT:
    gql(` query getFullReport($targetId: String!, $cycleId: String) {
    getReport(targetId: $targetId, cycleId: $cycleId) {
      _id {
        targetId
        cycleId
      }
      status
      summary
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
    }
  }`),

  GET_USER_FULLNAME_BY_ID: gql(`query getUserFullName($id: String) {
    getUser(id: $id) {
      fullName
    }
  }`),

  GET_USER_BY_ID: gql(`query getUserObject($id: String) {
    getUser(id: $id) {
      photo
      teamName
      title
      fullName
      _id
    }
  }`),

  GET_REPORT_FOR_EMPLOYEE:
    gql(`query getEmployeeReport($targetId: String!, $cycleId: String!) {
    getReport(targetId: $targetId, cycleId: $cycleId) {
      _id {
        targetId
        cycleId
      }
      summary
    }
  }`),

  LOGIN: gql(`query login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        id
    }
  }`),

  GET_CURRENT_CYCLE: gql(`query getCurrentCycle {
    getCurrentCycle {
      _id
      title
      startDate
      endDate
      peersPerTarget
      nominationDeadline
      reviewDeadline
      reportDeadline
    }
  }`),
  GET_USER_BY_NAME: gql(`query getUserByName($fullName: String!) {
    getUserByName(fullName: $fullName) {
      _id
    }
  }`),
  GET_PEER_REVIEWS:
    gql(` query getPeerReviews($targetId: String!, $cycleId: String!) {
    getReport(targetId: $targetId, cycleId: $cycleId) {
      _id {
        targetId
        cycleId
      }
      reviews {
        peers {
          grades {
            comment
            maxRating
            metric
            rating
          }
          _id
          isDeclined
          reviewerId
          submitted
        }
      }
    }
  }`),
  GET_REVIEWS_TO_WRITE: gql(`
  query getAssignedReviews($reviewerId: String) {
    getAssignedReviews(reviewerId: $reviewerId) {
      _id {
        targetId
      }
      status
    }
  }`),
  GET_ALL_REPORTS: gql(` 
  query getAllReports {
    getAllReports {
      _id {
        targetId
        cycleId
      }
      status
      summary
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
    }
  }
  `),
}

export const mutations = {
  UPDATE_REPORT: gql(`
    mutation updateReport($targetId:String!, $cycleId:String, $input:ReportInput) {
      updateReport(targetId:$targetId, cycleId:$cycleId, input:$input){
        summary
        reviews {
          peers {
            submitted
            reviewerId
            grades {
              metric
              rating
              maxRating
              comment
            }
          }
          manager {
            submitted
            reviewerId
          grades {
            metric
            rating
            maxRating
            comment
          }
        }
          self {
          submitted
          reviewerId
        grades {
          metric
          rating
          maxRating
          comment
        }
      }
      }
    }
  }`),
  UPDATE_ASSIGNED_REVIEW: gql(`
    mutation updateAssignedReview($targetId:String!, $input:ReviewInput!) {
      updateAssignedReview(targetId:$targetId, input:$input){
        _id {
          cycleId
          targetId
        }
        reviews {
          peers {
            submitted
            reviewerId
            grades {
              metric
              rating
              maxRating
              comment
            }
          }
          manager {
            submitted
            reviewerId
            grades {
              metric
              rating
              maxRating
              comment
            }
          }
          self {
            submitted
            reviewerId
            grades {
              metric
              rating
              maxRating
              comment
            }
          }
        }
      }
    }
  `),
  CREATE_USER: gql(`
    mutation createUser($input: UserInput!){
      createUser(input: $input){
          email
          fullName
          hashedPw 
          title 
          isAdmin 
          photo 
          teamName 
          companyName 
      }
    }
  `),
}
