import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "destructive" | "ghost";
  size?: "sm" | "md";
};
export const Button: React.FC<Props> = ({ className = "", variant = "default", size="md", ...props }) => {
  const base = "inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";
  const pad = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2";
  const style =
    variant === "outline" ? "border border-gray-300 bg-white hover:bg-gray-50"
    : variant === "destructive" ? "bg-red-600 text-white hover:bg-red-700"
    : variant === "ghost" ? "bg-transparent hover:bg-gray-100"
    : "bg-violet-600 text-white hover:bg-violet-700";
  return <button className={`${base} ${pad} ${style} ${className}`} {...props} />;
};
