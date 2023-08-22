'use client'
import axios from 'axios'
import { useEffect } from 'react'

function Report({ report }) {
  useEffect(() => {
    const targetId = '64e4f97db7850fd01d65a39b'
    const cycleId = '64e4f97db7850fd01d65a3a6'
    const query = `
      query GetReport($targetId: String!, $cycleId: String!) {
        getReport(targetId: $targetId, cycleId: $cycleId) {
          _id {
            target
            cycle
          }
          remarks
          status  
        }
      }`

    const variables = { targetId, cycleId }

    async function getReport() {
      try {
        const response = await axios.post('http://localhost:8080/graphql', {
          query,
          variables,
        })
        console.log('response', response)
      } catch (error) {
        console.error(error)
      }
    }
    getReport()
  }, [])

  return <div>View report</div>
}

export default Report
