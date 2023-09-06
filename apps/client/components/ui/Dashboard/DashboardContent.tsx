import Targets from '@/components/table/Targets'
import { Panel, PanelContent, PanelHeader } from '../Panel'
import NominationBox from '@/components/Combobox'

async function DashboardContent({
  assignedReviews,
  users,
  cycleId,
  loggedUserId,
  report,
}) {
  return (
    <div className="mt-10 grid grid-cols-3 max-w-screen h-[34rem] gap-10">
      <div className="col-span-2 h-full grid grid-col-2 gap-10 max-w-screen">
        <div className="border-2 grid-rows-1 border-black">
          <NominationBox
            users={users}
            loggedUserId={loggedUserId}
            report={report}
            cycleId={cycleId}
          ></NominationBox>
          <Panel>
            <PanelHeader>NOMINATION PHASE</PanelHeader>
            <PanelContent>
              {users.map((user) => (
                <Targets
                  assignedReviews={assignedReviews}
                  key={user.fullName}
                  loggedUser={user.fullName}
                  user={user}
                  cycleId={cycleId}
                />
              ))}
            </PanelContent>
          </Panel>
        </div>
        <div className="border-2 grid-rows-1 border-black">
          <Panel>
            <PanelHeader>REVIEW PHASE</PanelHeader>
            <PanelContent>Here is some content for the panel.</PanelContent>
          </Panel>
        </div>
      </div>
      <div className="col-span-1 grid grid-col-3 h-full max-w-screen gap-10">
        <div className="border-black border-2">ACTIVITTY</div>
        <div className="border-black border-2">REPORTS</div>
      </div>
    </div>
  )
}

export default DashboardContent

/*
?TARGETS

*/
