import { Button } from '@/components/ui/button'
import Link from 'next/link'

function SubmittedReport({ className }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <div className="mt-10 flex gap-6 justify-center">
        <Button disabled className="bg-green-500 disabled:opacity-100">
          Report submitted!
        </Button>
        <Link href={'/managerpanel'}>
          <Button>Back to Manager Panel</Button>
        </Link>
      </div>
    </div>
  )
}



export default SubmittedReport