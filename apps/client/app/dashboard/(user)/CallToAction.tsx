type CallToActionProps = { action: Action, numberOfPeers: number }
type Action = 'review' | 'nominate'

function CallToAction({ action, numberOfPeers }: CallToActionProps) {
  return (
    <ul className='list-disc pl-4'>
      <li>You have been asked to <span className='font-extrabold'>{action} {numberOfPeers} peers</span></li>
    </ul>
  )
}


export default CallToAction