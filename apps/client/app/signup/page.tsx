'use client'

import '@/app/global.css'
import SignUpForm from '@/components/form/SignUpForm'

export default function SignUp() {
  return (
    <div className="bg-backgroundlogin flex flex-col items-center h-screen justify-center">
      <div className="flex flex-col items-center w-[299px] h-[540px]">
        <h1 className="text-5xl text-white gap-4 mb-7">Sign Up</h1>
        <p className="text-darkturqouise mb-8">Welcome to Fist-Bump!</p>
        <SignUpForm />
      </div>
    </div>
  )
}
