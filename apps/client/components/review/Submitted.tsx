import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Submitted({ isManagerReport, className }: { isManagerReport: boolean, className?: string }) {
  return (
    <div className={`${className}`}>
      {isManagerReport ? <ReportSubmitted /> : <ReviewSubmitted />}
    </div>
  )
}

function ReportSubmitted() {
  return (
    <div className="mt-10 flex gap-6 justify-center">
      <Button disabled className="bg-green-500 disabled:opacity-100">
        Report submitted!
      </Button>
      <Link href={'/managerpanel'}>
        <Button>Back to Manager Panel</Button>
      </Link>
    </div>
  )
}

function ReviewSubmitted() {
  return (
    <div className="mt-10 flex gap-6 justify-center">
      <Button disabled className="bg-green-500 disabled:opacity-100">
        Review submitted!
      </Button>
      <Link href={'/dashboard'}>
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  )
}

export default Submitted