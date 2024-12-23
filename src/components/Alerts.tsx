// components/ui/alert-dialog.tsx
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogContent = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Content
            ref={ref}
            className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] rounded-lg bg-background p-6 shadow-lg animate-in"
            {...props}
        />
    </AlertDialogPrimitive.Portal>
))

const AlertDialogHeader = ({
                               className,
                               ...props
                           }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className="flex flex-col space-y-2 text-center sm:text-left"
        {...props}
    />
)

const AlertDialogFooter = ({
                               className,
                               ...props
                           }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
        {...props}
    />
)

const AlertDialogTitle = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Title
        ref={ref}
        className="text-lg font-semibold"
        {...props}
    />
))

const AlertDialogAction = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Action>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Action
        ref={ref}
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        {...props}
    />
))

const AlertDialogCancel = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Cancel
        ref={ref}
        className="inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold"
        {...props}
    />
))

export {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogAction,
    AlertDialogCancel,
}
