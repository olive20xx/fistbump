import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const panelVariants = cva(
  'rounded-md shadow-md h-full',
  {
    variants: {
      size: {
        horizontal: '',
        vertical: 'w-[416px]',
        page: 'w-[863px]',
      },
    },
    defaultVariants: {
      size: 'page',
    },
  }
)

export interface PanelProps extends
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof panelVariants> { }

// forwardRef<ElementType, PropsType>()
const Panel = React.forwardRef<
  HTMLDivElement,
  PanelProps
>(({ className, size, ...props }, ref) => {
  return (
    <div
      className={cn(panelVariants({ size, className }))}
      ref={ref}
      {...props}
    />
  )
})
// This is for debugging. It's also required when you create a component using 'forwardRef()'
Panel.displayName = 'Panel'

export default Panel