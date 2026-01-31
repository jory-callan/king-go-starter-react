import React from "react"

interface PageProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export default function Page({
  className,
  style,
  children,
}: PageProps) {
  return (
    <div className={className} style={style}>
      Landing Page
      {children}
    </div>
  )
}
