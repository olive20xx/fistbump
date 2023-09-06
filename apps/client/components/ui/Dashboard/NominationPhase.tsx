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
