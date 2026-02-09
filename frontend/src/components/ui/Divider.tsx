export function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto h-px w-24 bg-gradient-to-r from-transparent via-copper to-transparent ${className}`}
      role="separator"
    />
  );
}
