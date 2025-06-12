import React from "react";
import { cn } from "@/lib/utils";

export const Card = ({ className = "", ...props }) => {
  return (
    <div className={cn("bg-white rounded-2xl shadow-sm", className)} {...props} />
  );
};

export const CardContent = ({ className = "", ...props }) => {
  return (
    <div className={cn("p-4", className)} {...props} />
  );
};
