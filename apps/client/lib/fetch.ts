import axios from 'axios'

const url = 'http://localhost:8080/graphql'

export async function getUser(id, query) {
  const variables = { id }
  try {
    const response = await axios.post(url, {
      query,
      variables,
    })
    return response.data.data.getUser
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

export async function updateReport(query, variables) {
  try {
    await axios.post(url, { query, variables })
  } catch (error) {
    console.error(error)
  }
}
