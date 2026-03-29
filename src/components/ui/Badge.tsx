import * as React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sinapi" | "sicro" | "propria" | "default" | "success" | "warning" | "error"
}

export function Badge({ className = "", variant = "default", children, ...props }: BadgeProps) {
  const baseClasses = "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-bold uppercase tracking-wider border"
  
  const variants = {
    sinapi: "bg-blue-50 text-blue-700 border-blue-200",
    sicro: "bg-emerald-50 text-emerald-700 border-emerald-200",
    propria: "bg-amber-50 text-amber-700 border-amber-200",
    default: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    error: "bg-red-50 text-red-700 border-red-200"
  }

  const variantClasses = variants[variant]

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </div>
  )
}
