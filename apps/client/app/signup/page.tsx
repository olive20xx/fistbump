'use client'

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
import { useRouter } from 'next/navigation'
import { mutations } from '@/lib/graphql-queries'
import { useMutation } from '@apollo/client'

const FormSchema = z
  .object({
    fullName: z.string().min(1, 'Name is required').max(30),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      //!change later to 8 charachters
      .min(3, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    companyName: z.string().min(1, 'Company Name is required').max(30),
      //!change later to able to upload a pic
    profilepic: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  })

const SignUpForm = () => {
  const [createUser] = useMutation(mutations.CREATE_USER)

  const { push } = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      profilepic: ''
    },
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const email = values.email
    const hashedPw = values.password
    const fullName = values.fullName
    const companyName = values.companyName
    const variables = { input: { fullName, email, hashedPw, companyName } }
    console.log('--------> values',values)
    console.log('--------> variables',variables)

    try {
      const response = await createUser({ variables })
      console.log('User created:', response.data.createUser)
    } catch (error) {
      console.error('Error creating user:', error)
    }

    // push('/dashboard')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your company name"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profilepic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Sign up
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you already have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/login">
          Log in
        </Link>
      </p>
    </Form>
  )
}

// export default SignUpForm;

export default function Signup() {
  return (
    <div className="mt-32 flex flex-col h-screen">
      <div className="w-[550px] mx-auto p-20 border-slate-200 border-2 rounded-xl shadow-lg">
        <h1 className="text-center text-pink-500 font-semibold text-3xl">
          Welcome to
        </h1>
        <h1 className="text-center text-pink-500 font-semibold text-3xl mb-10">
          🤜💥🤛 Fistbump
        </h1>

        <SignUpForm></SignUpForm>
      </div>
    </div>
  )
}
