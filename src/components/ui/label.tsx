import { cn } from "@/lib/utils";

export function Label({
  className,
  children,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "block text-body-base font-medium text-dark-secondary mb-1",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
