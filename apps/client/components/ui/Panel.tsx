import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const panelVariants = cva(
  'rounded-md shadow-md h-full bg-white',
  {
    variants: {
      size: {
        horizontal: 'min-w-[750px] min-h-[250px]',
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

const headerVariants = cva('py-[15px] px-[20px] rounded-t-md',
  {
    variants: {
      variant: {
        white: 'bg-white text-turquoise border-b-gray-light border-b-2',
        gray: 'bg-gray-light text-turquoise-dark',
        darkgray: 'bg-gray text-white',
        highlight: 'bg-turquoise text-white',
      },
    },
    defaultVariants: {
      variant: 'gray',
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


const PanelTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'font-bold text-[20px] leading-none',
      className
    )}
    {...props}
  />
))
PanelTitle.displayName = 'PanelTitle'


const PanelContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      className
    )}
    {...props}
  />
))
PanelContent.displayName = 'PanelContent'



export { Panel, PanelHeader, PanelTitle, PanelContent }