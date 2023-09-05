import * as React from "react"
import Link from 'next/link'
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[30px] font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        //TODO hover colors need work
        light: "bg-green-light text-green-dark hover:brightness-95",
        heavy: "bg-green-dark text-white hover:bg-green-dark/80",
        write: "bg-black text-primary-foreground hover:bg-primary/90",
        draft: "bg-yellow-light text-yellow-dark hover:bg-yellow-dark/40",
        gray: "bg-gray-light text-gray",

        // ⬇️ included for backwards compatibility, don't use these for anything new
        destructive:
          "bg-green-600 text-destructive-foreground hover:bg-green-800",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "text-[10px]  w-[96px] h-[36px]",
        tall: "   text-[10px]  w-[96px] h-[36px]",
        big: "    text-[13px] w-[112px] h-[32px] drop-shadow-lg",
        metric: " text-[14px]  w-[30px] h-[30px] rounded-md shadow-sm",
        // ⬇️ included for backwards compability, don't use these for anything new
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href = '', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    if (href !== '') {
      return (
        <Link href={href}>
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
        </Link>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }