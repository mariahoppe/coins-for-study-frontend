import * as React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;
export const Switch: React.FC<Props> = ({ className="", ...props }) => (
  <label className="inline-flex items-center gap-2 cursor-pointer">
    <input type="checkbox" className="peer sr-only" {...props} />
    <span className="h-5 w-9 rounded-full bg-gray-300 peer-checked:bg-violet-600 transition-colors relative">
      <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4"></span>
    </span>
  </label>
);
