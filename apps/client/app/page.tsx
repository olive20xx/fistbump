'use client'
import '@/app/global.css'
import SignInForm from '@/components/form/SignInForm'
import WaveImage from '@/components/WaveImage'

export default function Page() {
  return (
    <div className="border-neutral-50 justify-center bg-turquoise-darkest h-screen flex flex-col items-center relative">
      <WaveImage />
      <div className="border-neutral-50 flex flex-col items-center w-[299px] relative z-10">
        <h1 className="text-5xl text-white gap-4 mb-7">Log In</h1>
        <p className="text-turquoise mb-10">Welcome back we missed you!</p>
        <SignInForm />
      </div>
    </div>
  )
}
