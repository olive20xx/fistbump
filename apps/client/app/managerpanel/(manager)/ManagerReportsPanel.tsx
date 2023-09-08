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
  console.log(users)

  return (
    <div>
      <Panel size="vertical">
        <PanelHeader variant="highlight">
          <PanelTitle>Reports</PanelTitle>
        </PanelHeader>
        <PanelContent className="p-2 items-center">
          {users.map((user: any) => (
            <div className="border-2 flex">
              <Image
                className="rounded-full mx-2"
                src={user.photo}
                width={50}
                height={50}
                alt={'profile picture'}
              />
              <div>
                <PanelTitle>{user.fullName.split(' ')[0]}'s Report</PanelTitle>
                <p>{user.teamName}'s Team</p>
              </div>
              <Button>Write a review</Button>
            </div>
          ))}
        </PanelContent>
      </Panel>
    </div>
  )
}

export default ManagerReportsPanel
