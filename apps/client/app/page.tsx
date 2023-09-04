'use client'

import { Button } from '@/components/ui/button'
import '@/app/global.css'
import Link from 'next/link'
import SignInForm from '@/components/form/SignInForm'

export default function Page() {
  return (
    <div className="bg-backgroundlogin flex flex-col items-center h-screen gap-10 justify-center">
      <div className="flex flex-col items-center w-[299px] h-[540px]">
        <h1 className="text-5xl text-white gap-4 mb-7">Log In</h1>
        <p className="text-darkturqouise mb-8">Welcome back we missed you!</p>
        <SignInForm />
      </div>

      <div className="flex gap-10">
        <Link href={'/dashboard'}>
          <Button>Go to dashboard</Button>
        </Link>
        <Link href={'/managerpanel'}>
          <Button>Go to managerpanel</Button>
        </Link>
      </div>
    </div>
  )
}
