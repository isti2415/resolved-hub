"use client"

import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

function Logo({
  width,
  height,
  withText,
  className
}: {
  width: number;
  height: number;
  withText?: boolean;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const src = withText
    ? resolvedTheme === "dark"
      ? "/Resolved Logo Dark With Text.webp"
      : "/Resolved Logo Light With Text.webp"
    : resolvedTheme === "dark"
    ? "/Resolved Logo Dark.webp"
    : "/Resolved Logo Light.webp";

  return (
    <Image
      width={width}
      height={height}
      src={src}
      alt="Resolved Logo"
      className={className}
    />
  );
}

export default Logo;
