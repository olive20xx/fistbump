
import { Button } from '@/components/ui/button';
import './global.css'
import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-3xl font-bold bg-pink-400 text-center'>WELCOME TO 360 REVIEW </h2>
      <Link href={'/dashboard'}>
        <Button>Go to dashboard</Button>
      </Link>
    </div>
  );
}
