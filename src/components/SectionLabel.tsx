interface SectionLabelProps {
  text: string;
}

export function SectionLabel({ text }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-4 mb-10 md:mb-12">
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-amber whitespace-nowrap">
        {text}
      </span>
      <div className="flex-1 h-px bg-card-border" />
    </div>
  );
}
