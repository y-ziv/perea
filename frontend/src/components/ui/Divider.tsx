export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative z-10 flex items-center justify-center space-x-4 py-8 ${className}`} role="separator">
      <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-copper/25" style={{ backfaceVisibility: 'hidden' }} />
      
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-copper/35" />
        <div className="h-2 w-2 rotate-45 border border-copper/50" />
        <div className="h-1.5 w-1.5 rounded-full bg-copper/35" />
      </div>

      <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-copper/25" style={{ backfaceVisibility: 'hidden' }} />
    </div>
  );
}
