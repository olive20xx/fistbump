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
import { mutations } from '@/lib/graphql-queries'
import { useMutation, useLazyQuery } from '@apollo/client'
import { queries } from '@/lib/graphql-queries'
import { useState } from 'react'
import ErrorHandler from '../ErrorHandler'


const FormSchema = z
  .object({
    fullName: z.string().min(1, 'Name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    companyName: z.string().min(0, 'Company Name is required').max(100),
    password: z
      .string()
      .min(1, 'Password is required')
      //change later to 8 charachters
      .min(3, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  })

const SignUpForm = () => {
  const [createUser] = useMutation(mutations.CREATE_USER)
  const { push } = useRouter()
  const [errorMessage, setErrorMessage] = useState(null)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      companyName: '',
    },
  })

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const variables = {
      input: {
        email: values.email,
        hashedPw: values.password,
        fullName: values.fullName,
        companyName: 'Arol.Dev',
      },
    }

    try {
      const response = await createUser({ variables })
      if (!response.data.createUser.email) setErrorMessage({ message: "Email already exists", code: "409" })
      setCookie('user', variables.input.fullName)
      push('/dashboard')
    } catch (error) {
      console.error('Error creating user:', error.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input disabled placeholder="Arol Dev" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Re-Enter Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mx-auto block w-full mt-14" type="submit">
          Sign up
        </Button>
      </form>
      <p className="text-center text-sm text-white mt-2">
        Already have an account, please&nbsp;
        <Link className="text-emerald-200 hover:underline" href="/">
          Log In
        </Link>
      </p>
      {errorMessage &&
        <div className="absolute top-0 right-100 mt-20 mr-4 p-2 bg-red-500 text-white rounded-lg shadow-md z-10"><ErrorHandler error={errorMessage} onClose={() => setErrorMessage(null)} /></div>
      }
    </Form>
  )
}

export default SignUpForm
