import { cn } from "@/lib/utils";
import React from "react";

export function SectionShell({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full bg-card border-border border rounded-card p-6 space-y-6",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
