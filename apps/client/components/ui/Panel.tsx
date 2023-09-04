import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const panelVariants = cva(
  'rounded-md shadow-md h-full',
  {
    variants: {
      size: {
        horizontal: 'min-w-[400px]',
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

const headerVariants = cva('',
  {
    variants: {
      variant: {
        white: 'bg-white ',
        grey: '',
        highlight: 'w-[863px]',
      },
    },
    defaultVariants: {
      variant: 'grey',
    },
  }
)

// ============ HEADER ============

export interface PanelHeaderProps extends
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof headerVariants> { }

// forwardRef<ElementType, PropsType>()
const PanelHeader = React.forwardRef<
  HTMLDivElement,
  PanelHeaderProps
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      className={cn(headerVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  )
})
PanelHeader.displayName = 'PanelHeader'



export default Panel