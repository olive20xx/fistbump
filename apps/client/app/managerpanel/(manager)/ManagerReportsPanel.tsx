import Image from 'next/image'
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from '../../../components/ui/Panel'
import { getUserById } from '@/lib/get-data-api'
import { Button } from '@/components/ui/button'

async function ManagerReportsPanel({ myManageesReports }) {
  const manageereport = myManageesReports.map((user) => user._id.targetId)
  const users = await Promise.all(
    manageereport.map(async (user) => await getUserById(user))
  )

  return (
    <div>
      <Panel size="vertical">
        <PanelHeader variant="highlight">
          <PanelTitle>Reports</PanelTitle>
        </PanelHeader>
        <PanelContent className="p-2 [&>*:nth-child(even)]:bg-gray-100">
          {users.map((user: any) => (
            <div key={user._id} className="p-2 items-center grid grid-cols-6 gap-4">
              <Image
                className="rounded-full col-start-1"
                src={user.photo}
                width={50}
                height={50}
                alt={'profile picture'}
              />
              <div className="col-span-3">
                <PanelTitle>{user.fullName.split(' ')[0]}&apos;s Report</PanelTitle>
                <p>{user.teamName}</p>
              </div>
              <Button href={`/employee/${user._id}/new-report`} className="col-end-6">Write a report</Button>
            </div>
          ))}
        </PanelContent>
      </Panel>
    </div>
  )
}

export default ManagerReportsPanel
