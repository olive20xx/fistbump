'use client'

import '@/app/global.css'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { queries } from '@/lib/graphql-queries'
import { useLazyQuery } from '@apollo/client'



const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    //!change later to 8 charachters
    .min(3, 'Password must have than 8 characters'),
})

const SignInForm = () => {

  const [getUser] = useLazyQuery(queries.GET_USER_BY_EMAIL);

  const { push } = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })


  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const email = values.email
    const password = values.password
    const variables = { email, password }

    const { data: { getUserByEmail } } = await getUser({ variables })


    if (getUserByEmail.fullName) {
      console.warn('WELCOME', getUserByEmail.fullName)
      setCookie('user', getUserByEmail.fullName)
      push('/dashboard')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mx-auto block w-1/3 mt-6" type="submit">
          Sign in
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/signup">
          Sign up
        </Link>
      </p>
    </Form>
  )
}



export default function Login() {
  return (
    <div className="mt-32 flex flex-col h-screen">
      <div className="w-[550px] mx-auto p-20 border-slate-200 border-2 rounded-xl shadow-lg">
        <h1 className="text-center text-pink-500 font-semibold text-3xl">
          Welcome to
        </h1>
        <h1 className="text-center text-pink-500 font-semibold text-3xl mb-10">
          🤜💥🤛 Fistbump
        </h1>

        <SignInForm></SignInForm>
      </div>
    </div>
  )
}
