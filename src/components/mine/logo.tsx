import * as React from "react"
import logo from "@/assets/logo.svg"

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number
}

export function Logo({ size = 24, className, ...props }: LogoProps) {
  return (
    <img
      src={logo}
      alt="Logo"
      width={size}
      height={size}
      className={className}
      {...props}
    />
  );
}
