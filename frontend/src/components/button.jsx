import React from "react";
import { cn } from "@/lib/utils";

export const Button = ({ className = "", variant = "default", ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium transition";

  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700 shadow-md",
    outline: "border border-green-600 text-green-700 hover:bg-green-100",
  };

  return (
    <button className={cn(baseStyle, variants[variant], className)} {...props} />
  );
};
