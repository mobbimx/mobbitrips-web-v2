function CardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="h-52 animate-pulse bg-brand-border" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1.5">
          <div className="h-5 w-2/3 animate-pulse rounded-lg bg-brand-border" />
          <div className="h-3 w-1/3 animate-pulse rounded-lg bg-brand-border" />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="h-3.5 w-full animate-pulse rounded-lg bg-brand-border" />
          <div className="h-3.5 w-4/5 animate-pulse rounded-lg bg-brand-border" />
          <div className="h-3.5 w-3/5 animate-pulse rounded-lg bg-brand-border" />
        </div>
        <div className="flex gap-4 border-t border-brand-border pt-3">
          <div className="h-3 w-16 animate-pulse rounded-lg bg-brand-border" />
          <div className="h-3 w-12 animate-pulse rounded-lg bg-brand-border" />
          <div className="h-3 w-14 animate-pulse rounded-lg bg-brand-border" />
        </div>
      </div>
    </div>
  );
}

export default function PropiedadesLoading() {
  return (
    <main id="main-content">
      <div className="border-b border-brand-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-3.5 w-36 animate-pulse rounded-lg bg-brand-border" />
          <div className="mt-2 h-8 w-56 animate-pulse rounded-xl bg-brand-border" />
          <div className="mt-2 h-4 w-40 animate-pulse rounded-lg bg-brand-border" />
        </div>
      </div>
      <div className="min-h-screen bg-brand-cream">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
