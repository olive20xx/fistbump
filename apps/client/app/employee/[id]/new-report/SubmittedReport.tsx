import { Button } from '@/components/ui/button'
import Link from 'next/link'

function SubmittedReport() {
  return (
    <div className="w-1/2 border-2 p-4">
      <div className="mt-10 flex gap-6 justify-center">
        <Button disabled className="bg-green-500 disabled:opacity-100">
          Report submitted!
        </Button>
        <Link href={'/dashboard'}>
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}



export default SubmittedReport