import { gql } from '@/src/__generated__'

export const queries = {
  GET_USERS: gql(`query getUsers {
    getUsers {
      _id
      fullName
      title
      teamName
    }
  }`),

  GET_FULL_REPORT:
    gql(` query getFullReport($targetId: String!, $cycleId: String!) {
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

  GET_USER_BY_EMAIL:
    gql(`query getUserByEmail($email: String!, $password: String!) {
    getUserByEmail(email: $email, password: $password) {
      fullName
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
          isDeclined
          reviewerId
          submitted
        }
      }
    }
  }`),
}

export const mutations = {
  UPDATE_REPORT: gql(`
    mutation updateReport($targetId:String!, $cycleId:String!, $input:ReportInput!) {
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
  UPDATE_PEER_REVIEWS: gql(`
    mutation updatePeerReviews($targetId:String!, $cycleId:String!, $input:PeerUpdateInput!) {
      updatePeerReview(targetId: $targetId, cycleId: $cycleId, input: $input) {
        reviews {
          peers {
            reviewerId
          }
        }
    }
  }`),
}
