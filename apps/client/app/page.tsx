'use client'
import Wave from 'react-wavify'
import '@/app/global.css'
import SignInForm from '@/components/form/SignInForm'

export default function Page() {
  return (
    <div className="border-neutral-50 justify-center bg-backgroundlogin h-screen flex flex-col items-center">
      <div className="border-neutral-50 flex flex-col items-center w-[299px]">
        <h1 className="text-5xl text-white gap-4 mb-7">Log In</h1>
        <p className="text-darkturqouise mb-10">Welcome back we missed you!</p>
        <SignInForm />
      </div>
      <Wave
        className="opacity-30 absolute bottom-0"
        fill="#03BCA7"
        paused={false}
        style={{ display: 'flex' }}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.25,
          points: 3,
        }}
      />
    </div>
  )
}
