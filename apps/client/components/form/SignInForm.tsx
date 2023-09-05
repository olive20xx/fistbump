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
import { getCookie, setCookie } from 'cookies-next'
import { redirect, useRouter } from 'next/navigation'
import { queries } from '@/lib/graphql-queries'
import { useLazyQuery } from '@apollo/client'
import ErrorHandler from '../ErrorHandler'
import { useEffect, useState } from 'react'


const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    //change later to 8 charachters
    .min(3, 'Password must have than 8 characters'),
})

const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const [loginUser] = useLazyQuery(queries.LOGIN, { fetchPolicy: "no-cache", })

  const { push } = useRouter()

  useEffect(() => {
    const token = getCookie('token')
    const userId = getCookie('userId')
    if (token && userId) {
      //it redirects to the dashboard, but what if the user is a manager?
      redirect('/dashboard')
    }
  }, [])

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

    try {

      const { loading, data, error } = await loginUser({ variables })

      if (error) {
        setErrorMessage({ message: error.message, code: 'Not Found' })

        form.reset({ email: '', password: '' })
        return `Error! ${error}`;
      }


      if (loading) return 'Loading...';
      const login = data.login
      if (login.token && login.id) {
        setCookie('token', login.token)
        setCookie('userId', login.id)
      }

      push('/dashboard')
    }
    catch (error) {
      console.error('An unexpected error occurred:', error);
      form.reset({ email: '', password: '' })
      setErrorMessage({ message: 'An error occured. Please try again.' });

    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mx-auto block w-full mt-6" type="submit">
          Log in
        </Button>
      </form>
      {errorMessage &&
        <div className="absolute top-0 right-100 mt-20 mr-4 p-2 bg-red-500 text-white rounded-lg shadow-md z-10"><ErrorHandler error={errorMessage} onClose={() => setErrorMessage(null)} /></div>
      }
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

export default SignInForm
