import axios from 'axios'

const url = process.env.GRAPHQL_API_URL

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
  console.log('CALLING UPDATEREPORT() with query', query)
  console.log('CALLING UPDATEREPORT() with variables', variables)
  try {
    console.log('try')
    const updatedReport = await axios.post(url, { query, variables })
    console.log('🤷🏻‍♀️🤷🏻‍♀️🤷🏻‍♀️🤷🏻‍♀️🤷🏻‍♀️', updatedReport)
  } catch (error) {
    console.error(error)
  }
}

export async function getUserByEmail(query, variables) {
  try {
    const response = await axios.post('http://localhost:8080/graphql', {
      query,
      variables,
    })
    return response.data.data.getUserByEmail
  } catch (error) {
    console.log(error)
  }
}
