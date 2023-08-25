import SignInForm from '@/components/form/SignInForm'
import '../global.css'

export default function Login() {
  return (
    <div className="mt-32 flex flex-col h-screen">
      <div className="w-1/2 mx-auto p-20 border-slate-200 border-2 rounded-xl shadow-lg">
        <SignInForm></SignInForm>
      </div>
    </div>
  )
}
