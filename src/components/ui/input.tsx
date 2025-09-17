import * as React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-2xl border bg-white text-gray-900 placeholder:text-gray-500 px-3 py-2
                  focus:ring-2 focus:ring-violet-600 outline-none ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input";
