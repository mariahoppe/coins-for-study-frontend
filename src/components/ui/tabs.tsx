import * as React from "react";

type Ctx = { value: string; setValue: (v: string)=>void };
const TabsContext = React.createContext<Ctx | null>(null);

export function Tabs({ value, onValueChange, children }: { value: string; onValueChange: (v: string)=>void; children: React.ReactNode }) {
  return <TabsContext.Provider value={{ value, setValue: onValueChange }}>{children}</TabsContext.Provider>;
}

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className="", ...props }) => (
  <div className={`flex gap-2 flex-wrap ${className}`} {...props} />
);

export function TabsTrigger({ value, className="", children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(TabsContext)!;
  const active = ctx.value === value;
  return (
    <button
      onClick={()=>ctx.setValue(value)}
      className={`rounded-2xl border px-3 py-1.5 text-sm ${active ? "bg-violet-600 text-white border-violet-600" : "bg-white hover:bg-gray-50" } ${className}`}
    >{children}</button>
  );
}

export function TabsContent({ value, className="", children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(TabsContext)!;
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
