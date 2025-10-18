export function Input({ type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className="w-full border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base font-body text-dark-primary placeholder:text-dark-secondary"
      type={type}
      {...props}
    />
  );
}
