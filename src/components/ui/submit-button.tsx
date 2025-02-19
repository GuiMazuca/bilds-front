import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button variant={"secondary"} type="submit" className={cn("w-full", className)} {...props}>
      {children}
    </Button>
  )
}

