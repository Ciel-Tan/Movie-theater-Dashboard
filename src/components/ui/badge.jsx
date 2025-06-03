import "@/styles/badge.css"

export function Badge({ children, variant = "default", className = "", ...props }) {
  return (
    <span className={`badge badge-${variant} ${className}`} {...props}>
      {children}
    </span>
  )
}
