import { apolloClient } from '@/lib/apollo-client'
import '../../../../global.css'
import { queries } from '@/lib/graphql-queries'


async function Report({ params }) {

  const variables = { targetId: params.id, cycleId: params.cycleId }

  const { data: { getUser: { fullName } } } = await apolloClient.query({ query: queries.GET_USER_FULLNAME_BY_ID, variables: { id: params.id } })
  const { data: { getReport } } = await apolloClient.query({ query: queries.GET_REPORT_FOR_EMPLOYEE, variables })

  return (
    <div className='p-4'>

      <h1 className="text-2xl">Your Report {fullName}</h1>
      <div>
        <p>Remarks:</p>
        <p>{getReport.summary}</p>
      </div>
    </div >
  )
}

export default Report
