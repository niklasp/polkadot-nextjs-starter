export function Info({
  label,
  element,
}: {
  label: React.ReactNode;
  element: React.ReactNode;
}) {
  return (
    <div className="text-sm text-gray-500 flex flex-col gap-0">
      <div className="text-lg text-foreground font-semibold font-mono">
        {element}
      </div>
      <div className="text-sm text-muted-foreground/50">{label}</div>
    </div>
  );
}
