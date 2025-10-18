import { cn } from "@/lib/utils";

export function Input({
  type,
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "w-full border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base font-body text-dark-primary placeholder:text-dark-secondary",
        className
      )}
      type={type}
      {...props}
    />
  );
}
