import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "plasmo-inline-flex plasmo-items-center plasmo-justify-center plasmo-gap-2 plasmo-whitespace-nowrap plasmo-rounded-md plasmo-text-sm plasmo-font-medium plasmo-transition-colors focus-visible:plasmo-outline-none focus-visible:plasmo-ring-1 focus-visible:plasmo-ring-ring disabled:plasmo-pointer-events-none disabled:plasmo-opacity-50 [&_svg]:plasmo-pointer-events-none [&_svg]:plasmo-size-4 [&_svg]:plasmo-shrink-0",
  {
    variants: {
      variant: {
        default:
          "plasmo-bg-primary plasmo-text-primary-foreground plasmo-shadow hover:plasmo-bg-primary/90",
        destructive:
          "plasmo-bg-destructive plasmo-text-destructive-foreground plasmo-shadow-sm hover:plasmo-bg-destructive/90",
        outline:
          "plasmo-border plasmo-border-input plasmo-bg-background plasmo-shadow-sm hover:plasmo-bg-accent hover:plasmo-text-accent-foreground",
        secondary:
          "plasmo-bg-secondary plasmo-text-secondary-foreground plasmo-shadow-sm hover:plasmo-bg-secondary/80",
        ghost: "hover:plasmo-bg-accent hover:plasmo-text-accent-foreground",
        link: "plasmo-text-primary plasmo-underline-offset-4 hover:plasmo-underline",
      },
      size: {
        default: "plasmo-h-9 plasmo-px-4 plasmo-py-2",
        sm: "plasmo-h-8 plasmo-rounded-md plasmo-px-3 plasmo-text-xs",
        lg: "plasmo-h-10 plasmo-rounded-md plasmo-px-8",
        icon: "plasmo-h-9 plasmo-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
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
