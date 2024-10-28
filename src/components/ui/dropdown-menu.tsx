"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "plasmo-flex plasmo-cursor-default plasmo-gap-2 plasmo-select-none plasmo-items-center plasmo-rounded-sm plasmo-px-2 plasmo-py-1.5 plasmo-text-sm plasmo-outline-none focus:plasmo-bg-accent data-[state=open]:plasmo-bg-accent [&_svg]:plasmo-pointer-events-none [&_svg]:plasmo-size-4 [&_svg]:plasmo-shrink-0",
      inset && "plasmo-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="plasmo-ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "plasmo-z-50 plasmo-min-w-[8rem] plasmo-overflow-hidden plasmo-rounded-md plasmo-border plasmo-bg-popover plasmo-p-1 plasmo-text-popover-foreground plasmo-shadow-lg data-[state=open]:plasmo-animate-in data-[state=closed]:plasmo-animate-out data-[state=closed]:plasmo-fade-out-0 data-[state=open]:plasmo-fade-in-0 data-[state=closed]:plasmo-zoom-out-95 data-[state=open]:plasmo-zoom-in-95 data-[side=bottom]:plasmo-slide-in-from-top-2 data-[side=left]:plasmo-slide-in-from-right-2 data-[side=right]:plasmo-slide-in-from-left-2 data-[side=top]:plasmo-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "plasmo-z-50 plasmo-min-w-[8rem] plasmo-overflow-hidden plasmo-rounded-md plasmo-border plasmo-bg-popover plasmo-p-1 plasmo-text-popover-foreground plasmo-shadow-md",
        "data-[state=open]:plasmo-animate-in data-[state=closed]:plasmo-animate-out data-[state=closed]:plasmo-fade-out-0 data-[state=open]:plasmo-fade-in-0 data-[state=closed]:plasmo-zoom-out-95 data-[state=open]:plasmo-zoom-in-95 data-[side=bottom]:plasmo-slide-in-from-top-2 data-[side=left]:plasmo-slide-in-from-right-2 data-[side=right]:plasmo-slide-in-from-left-2 data-[side=top]:plasmo-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "plasmo-relative plasmo-flex plasmo-cursor-default plasmo-select-none plasmo-items-center plasmo-gap-2 plasmo-rounded-sm plasmo-px-2 plasmo-py-1.5 plasmo-text-sm plasmo-outline-none plasmo-transition-colors focus:plasmo-bg-accent focus:plasmo-text-accent-foreground data-[disabled]:plasmo-pointer-events-none data-[disabled]:plasmo-opacity-50 [&>svg]:plasmo-size-4 [&>svg]:plasmo-shrink-0",
      inset && "plasmo-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "plasmo-relative plasmo-flex plasmo-cursor-default plasmo-select-none plasmo-items-center plasmo-rounded-sm plasmo-py-1.5 plasmo-pl-8 plasmo-pr-2 plasmo-text-sm plasmo-outline-none plasmo-transition-colors focus:plasmo-bg-accent focus:plasmo-text-accent-foreground data-[disabled]:plasmo-pointer-events-none data-[disabled]:plasmo-opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="plasmo-absolute plasmo-left-2 plasmo-flex plasmo-h-3.5 plasmo-w-3.5 plasmo-items-center plasmo-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="plasmo-h-4 plasmo-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "plasmo-relative plasmo-flex plasmo-cursor-default plasmo-select-none plasmo-items-center plasmo-rounded-sm plasmo-py-1.5 plasmo-pl-8 plasmo-pr-2 plasmo-text-sm plasmo-outline-none plasmo-transition-colors focus:plasmo-bg-accent focus:plasmo-text-accent-foreground data-[disabled]:plasmo-pointer-events-none data-[disabled]:plasmo-opacity-50",
      className
    )}
    {...props}
  >
    <span className="plasmo-absolute plasmo-left-2 plasmo-flex plasmo-h-3.5 plasmo-w-3.5 plasmo-items-center plasmo-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="plasmo-h-4 plasmo-w-4 plasmo-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "plasmo-px-2 plasmo-py-1.5 plasmo-text-sm plasmo-font-semibold",
      inset && "plasmo-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("plasmo--mx-1 plasmo-my-1 plasmo-h-px plasmo-bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("plasmo-ml-auto plasmo-text-xs plasmo-tracking-widest plasmo-opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
