import axios from 'axios'

const url = process.env.NEXT_PUBLIC_GRAPHQL_API_URL

export async function getUser(query, variables) {
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
    console.log('im insise update report ')
    await axios.post(url, { query, variables })
  } catch (error) {
    console.error(error)
  }
}

export async function getUserByEmail(query, variables) {
  try {
    const response = await axios.post(url, {
      query,
      variables,
    })
    return response.data.data.getUserByEmail
  } catch (error) {
    console.log(error)
  }
}
