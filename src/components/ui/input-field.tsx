import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const InputField: React.FC<InputFieldProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <Input className={cn(error && "border-red-500", className)} {...props} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

