import * as React from "react";
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", ...props }, ref) => (
    <textarea ref={ref} className={`w-full rounded-2xl border px-3 py-2 focus:ring-2 focus:ring-violet-600 outline-none ${className}`} {...props} />
  )
);
Textarea.displayName = "Textarea";
