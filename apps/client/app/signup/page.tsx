'use client'

import '@/app/global.css'
import SignUpForm from '@/components/form/SignUpForm'

export default function SignUp() {
  return (
    <div className="bg-backgroundlogin flex flex-col items-center h-screen gap-10 justify-center">
      <div className="w-[550px] mx-auto p-20 border-slate-200 border-2 rounded-xl shadow-lg">
        <SignUpForm></SignUpForm>
      </div>
    </div>
  )
}
