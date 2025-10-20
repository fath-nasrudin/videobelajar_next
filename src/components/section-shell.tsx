export function SectionShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-card border-border border rounded-card p-6 space-y-6">
      {children}
    </section>
  );
}
