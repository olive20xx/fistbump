import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Mails, Mail } from 'lucide-react'

function Submitted({ isManagerReport, className }: { isManagerReport: boolean, className?: string }) {
  return (
    // <div className={`${className}`}>
    <div className='flex justify-center h-[600px] items-center '>
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
    <Alert className="mt-10 flex-col w-1/2 text-center h-1/2">
      <Mails width={80} height={80}></Mails>
      <Mail className="h-4 w-4" />
      <AlertTitle>    Thank you!</AlertTitle>
      <AlertDescription>
        Your review has been submitted. You will recieve your report very soon!  </AlertDescription>
      <Button href='/dashboard' className='bg-black rounded-sm w-32 text-white'>
        <ArrowLeft></ArrowLeft>
        Back to Dashboard</Button>
    </Alert >






    // <div className="mt-10 flex gap-6 justify-center">
    //   <Button disabled className="bg-green-500 disabled:opacity-100">
    //     Review submitted!
    //   </Button>
    //   <Link href={'/dashboard'}>
    //     <Button>Back to Dashboard</Button>
    //   </Link>
    // </div>
  )
}

export default Submitted