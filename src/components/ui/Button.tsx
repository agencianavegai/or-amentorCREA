import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crea-blue-500 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      primary: "bg-crea-blue-600 text-white hover:bg-crea-blue-700 shadow-sm",
      secondary: "bg-crea-gray-100 text-crea-gray-900 hover:bg-crea-gray-200",
      outline: "border border-crea-gray-300 bg-transparent hover:bg-crea-gray-100 text-crea-gray-900",
      ghost: "hover:bg-crea-gray-100 hover:text-crea-gray-900",
    }
    
    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-6 text-base",
    }

    const compiledClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    return (
      <button
        ref={ref}
        className={compiledClasses}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
