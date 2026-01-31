import React from "react"

interface ExampleProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export default function Example({
  className,
  style,
  children,
}: ExampleProps) {
  return (
    <div className={className} style={style}>
      <h1>Example Page</h1>
      <h3>示例界面 </h3>
      <p>{children}</p>
    </div>
  )
}
