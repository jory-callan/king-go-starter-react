import React from "react"

interface ExampleProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  title?: string
}

export function Example({
  className,
  style,
  children,
  title
}: ExampleProps) {
  return (
    <div className={className} style={style} title={title}>
      {children}
    </div>
  )
}
