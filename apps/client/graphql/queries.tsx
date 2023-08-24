export const getUsersQuery = `{
  getUsers {
    _id
    fullName
    title
    teamName
  }
}`

export const mutation = `
mutation updateReport($targetId:String!, $cycleId:String!, $input:ReportInput!) {
  updateReport(targetId:$targetId, cycleId:$cycleId, input:$input){
    remarks
    reviews {
      peer {
        submitted
        reviewer
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
    title
    teamName
    photo
}}`

export const reportQuery = `
  query GetReport($targetId: String!, $cycleId: String!) {
    getReport(targetId: $targetId, cycleId: $cycleId) {
      _id { 
        target
        cycle 
      }
      reviews {
        peer {
          submitted
          reviewer
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