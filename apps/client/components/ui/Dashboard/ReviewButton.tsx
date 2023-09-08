import IconWrite from 'static/icon-write.svg'
import EyeIcon from 'static/eye-open-green.svg'
import Photo from '@/components/ui/photo'
import { ReviewStatus } from '@/types/review-status'
import { Button, buttonVariants } from '../button'

export function ReviewButton({ userId, reviewStatus }: { userId: string, reviewStatus: ReviewStatus }) {
  //TODO fix types
  let variant: any
  let icon: any
  let text: string

  switch (reviewStatus) {
    case 'ready':
      text = 'Write review'
      variant = 'heavy'
      icon = IconWrite
      break
    case 'draft':
      text = 'Edit draft'
      variant = 'draft'
      icon = IconWrite
      break
    case 'submitted':
      text = 'Submitted'
      variant = 'light'
      icon = EyeIcon
  }

  return (
    <Button
      href={`/employee/${userId}/new-review`}
      className={buttonVariants({ variant })}
    >
      {text} <Photo className='ml-2' photo={icon} alt='icon' width={12} />
    </Button>
  )
}