export const getFullReportQuery = `
query GetReport($targetId: String!, $cycleId: String!) {
  getReport(targetId: $targetId, cycleId: $cycleId) {
    _id{ 
      target
      cycle
    }
    remarks
    status
    reviews {
      peer {
        reviewer
        isDeclined
        submitted
        grades {
          metric
          rating
          maxRating
          comment
        }
      }
      self {
        reviewer
        isDeclined
        submitted
        grades {
          metric
          rating
          maxRating
          comment
        }
      }         
     }
  }
}`


export const userQuery = `
query getUser($id: String) {
  getUser(id:$id) {
    fullName
 
}
}`

export const reportQuery = `
query GetReport($targetId: String!, $cycleId: String!) {
  getReport(targetId: $targetId, cycleId: $cycleId) {
    _id {
      target
      cycle
    }
    remarks
  }
}`