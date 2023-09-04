import * as React from 'react'
import { cn } from '@/lib/utils'

const defaultStyle = ''

// forwardRef<ElementType, PropsType>()
const Panel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn(defaultStyle, className)} {...props} />
  )
})
// This is for debugging. It's also required when you create a component using 'forwardRef()'
Panel.displayName = 'Panel'

export default Panel