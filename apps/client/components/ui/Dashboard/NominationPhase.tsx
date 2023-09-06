import { Panel, PanelContent, PanelHeader } from '../Panel'

async function NominationPhase() {
  return (
    <div className="border-2 grid-rows-1 border-black">
      <Panel>
        <PanelHeader>NOMINATION PHASE</PanelHeader>
        <PanelContent>Here is some content for the panel.</PanelContent>
      </Panel>
    </div>
  )
}

export default NominationPhase

/*
?TARGETS
        {users.map((user) => (
          <Targets
            assignedReviews={assignedReviews}
            key={user.fullName}
            loggedUser={loggedUserFirstName}
            user={user}
            cycleId={cycleId}
          />
        ))}
*/
