import Image from 'next/image'
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from '../../../components/ui/Panel'
import { getUserById } from '@/lib/get-data-api'

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
        <PanelContent className="p-10">
          {users.map((user) => (
            <PanelTitle>{user.fullName}</PanelTitle>
          ))}
        </PanelContent>
      </Panel>
    </div>
  )
}

export default ManagerReportsPanel
