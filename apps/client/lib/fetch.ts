import axios from 'axios'

const url = 'http://localhost:8080/graphql'

export async function getUser(id) {
  const query = `
  query getUser($id: String) {
    getUser(id:$id) {
      fullName
  }
}`

  const variables = { id }

  try {
    const response = await axios.post(url, {
      query,
      variables,
    })
    return response.data.data.getUser.fullName
  } catch (error) {
    console.error(error)
  }
}

export async function getReport(query, variables) {
  try {
    const response = await axios.post(url, {
      query,
      variables,
    })
    return response.data.data.getReport
  } catch (error) {
    console.error(error)
  }
}
