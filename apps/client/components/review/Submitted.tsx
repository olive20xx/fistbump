import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Mails, Mail } from 'lucide-react'

function Submitted({ isManagerReport, className }: { isManagerReport: boolean, className?: string }) {
  return (
    // <div className={`${className}`}>
    <div className='flex justify-center  z-10  '>
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
    <Alert className="mt-10 flex-col w-3/4 text-center h-1/2">
      <div className='flex justify-center pb-4'>
        <Mails className='w-24 h-24'></Mails>
      </div>
      <AlertTitle className='text-2xl font-bold pb-4'> Thank you!</AlertTitle>
      <AlertDescription className='text-gray pb-4 mx-32'>
        Your review has been submitted. You will recieve your report very soon!  </AlertDescription>
      <Button href='/dashboard' className='bg-black rounded-sm w-40 text-white '>
        <ArrowLeft></ArrowLeft>
        Back to Dashboard</Button>
    </Alert >
  )
}

export default Submitted