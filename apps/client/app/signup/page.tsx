'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { queries } from '@/lib/graphql-queries'


const FormSchema = z
  .object({
    firstName: z.string().min(1, 'Name is required').max(15),
    lastName: z.string().min(1, 'Name is required').max(15),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      //!change later to 8 charachters
      .min(3, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

const SignUpForm = () => {

  const { push } = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    const email = values.email
    const password = values.password
    const firstName = values.firstName
    const lastName = values.lastName
    const variables = { firstName, lastName, email, password }

    const { data: { getUserByEmail } } = await getUser({ variables })

    push('/dashboard')

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
      <div className='flex justify-between'>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder='John' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder='Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Re-Enter your password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          Sign up
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you already have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/login'>
          Log in
        </Link>
      </p>
    </Form>
  );
};

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