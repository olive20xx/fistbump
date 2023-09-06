import { Panel, PanelContent, PanelHeader } from '../Panel'

async function ReviewPhase() {
  return (
    <div className="col-span-2 h-full grid grid-col-2 gap-10 max-w-screen">
      <div className="border-2 grid-rows-1 border-black">
        <Panel>
          <PanelHeader>REVIEW PHASE</PanelHeader>
          <PanelContent>Here is some content for the panel.</PanelContent>
        </Panel>
      </div>
    </div>
  )
}

export default ReviewPhase
