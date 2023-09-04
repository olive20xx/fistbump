import { Button } from '@/components/ui/button'
import { EyeOpenIcon } from '@radix-ui/react-icons'

function ButtonTest() {
  return (
    <div className='mt-32 flex flex-col gap-10'>
      <Button size='big' className=''>Log In</Button>
      <Button size='big' variant='heavy'>Sign up</Button>
      <Button size='tall'>View less</Button>
      <Button variant='write'>View review</Button>
      <Button variant='write'>Write review</Button>
      <Button variant='draft'>Edit draft</Button>
    </div>
  )
}

export default ButtonTest