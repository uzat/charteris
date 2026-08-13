'use client';

interface HeaderProps {
  propertyName: string;
}

export default function Header({ propertyName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-navy border-b border-sand/10">
      <div className="mx-auto max-w-[960px] px-4 py-4 flex items-center justify-between">
        <span className="font-sans font-bold text-sm tracking-widest text-sand/80 uppercase">
          Charteris
        </span>
        <span className="text-xs text-sand/50 uppercase tracking-wide">
          <span className="text-sand/30 mr-1">Property</span>
          {propertyName}
        </span>
      </div>
    </header>
  );
}
