'use client'

import { Button } from '@/components/ui/button'
import '@/app/global.css'
import Link from 'next/link'
import SignInForm from '@/components/form/SingInForm'

export default function Page() {
  return (
    <div className="flex flex-col items-center h-screen gap-10 justify-center">
      <h2 className="text-3xl font-bold bg-pink-400 text-center">
        WELCOME TO 360 REVIEW{' '}
      </h2>
      <Link href={'/dashboard'}>
        <Button>Go to dashboard</Button>
      </Link>
      <Link href={'/managerpanel'}>
        <Button>Go to managerpanel</Button>
      </Link>
      <div className="w-[550px] mx-auto p-20 border-slate-200 border-2 rounded-xl shadow-lg">
        <SignInForm></SignInForm>
      </div>
    </div>
  )
}
