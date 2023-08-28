import { getClient } from '@/lib/client'
import '../../../../global.css'
import { GET_REPORT_FOR_EMPLOYEE, GET_USER_FULLNAME_BY_ID } from '@/lib/queries'



async function Report({ params }) {

  const client = getClient()

  const targetId = params.id
  const cycleId = params.cycleId

  // const status = undefined
  const variables = { targetId, cycleId }


  const report = await client.query({ query: GET_REPORT_FOR_EMPLOYEE, variables })
  const user = await client.query({ query: GET_USER_FULLNAME_BY_ID, variables: { id: targetId } })
  console.log('report--------------->', report)
  console.log('user--------------->', user)


  console.log(variables)

  return (
    <div className='p-4'>
      {/* 
      <h1 className="text-2xl">Your Report {user.fullName}</h1>
      <div>
        <p>Remarks:</p>
        <p>{report.summmary}</p>
      </div> */}

    </div >

  )
}

export default Report
