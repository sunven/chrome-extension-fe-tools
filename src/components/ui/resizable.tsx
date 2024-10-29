"use client"

import { DragHandleDots2Icon } from "@radix-ui/react-icons"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "plasmo-flex plasmo-h-full plasmo-w-full data-[panel-group-direction=vertical]:plasmo-flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "plasmo-relative plasmo-flex plasmo-w-px plasmo-items-center plasmo-justify-center plasmo-bg-border after:plasmo-absolute after:plasmo-inset-y-0 after:plasmo-left-1/2 after:plasmo-w-1 after:plasmo--translate-x-1/2 focus-visible:plasmo-outline-none focus-visible:plasmo-ring-1 focus-visible:plasmo-ring-ring focus-visible:plasmo-ring-offset-1 data-[panel-group-direction=vertical]:plasmo-h-px data-[panel-group-direction=vertical]:plasmo-w-full data-[panel-group-direction=vertical]:after:plasmo-left-0 data-[panel-group-direction=vertical]:after:plasmo-h-1 data-[panel-group-direction=vertical]:after:plasmo-w-full data-[panel-group-direction=vertical]:after:plasmo--translate-y-1/2 data-[panel-group-direction=vertical]:after:plasmo-translate-x-0 [&[data-panel-group-direction=vertical]>div]:plasmo-rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="plasmo-z-10 plasmo-flex plasmo-h-4 plasmo-w-3 plasmo-items-center plasmo-justify-center plasmo-rounded-sm plasmo-border plasmo-bg-border">
        <DragHandleDots2Icon className="plasmo-h-2.5 plasmo-w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
