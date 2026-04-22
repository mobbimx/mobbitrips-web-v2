export default function PropertyDetailLoading() {
  return (
    <main id="main-content" className="min-h-screen bg-brand-cream pb-20">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-3.5 w-10 animate-pulse rounded bg-brand-border" />
          <div className="h-3 w-3 animate-pulse rounded bg-brand-border" />
          <div className="h-3.5 w-20 animate-pulse rounded bg-brand-border" />
          <div className="h-3 w-3 animate-pulse rounded bg-brand-border" />
          <div className="h-3.5 w-24 animate-pulse rounded bg-brand-border" />
        </div>

        {/* Title */}
        <div className="mb-2 h-8 w-64 animate-pulse rounded-xl bg-brand-border" />
        <div className="mb-6 flex gap-4">
          <div className="h-4 w-28 animate-pulse rounded-lg bg-brand-border" />
          <div className="h-4 w-20 animate-pulse rounded-lg bg-brand-border" />
          <div className="h-4 w-20 animate-pulse rounded-lg bg-brand-border" />
          <div className="h-4 w-28 animate-pulse rounded-lg bg-brand-border" />
        </div>

        {/* Gallery */}
        <div className="h-72 w-full animate-pulse rounded-2xl bg-brand-border sm:h-96" />

        {/* Content + Widget */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-8">
            <div className="space-y-3">
              <div className="h-6 w-48 animate-pulse rounded-xl bg-brand-border" />
              <div className="h-4 w-full animate-pulse rounded-lg bg-brand-border" />
              <div className="h-4 w-4/5 animate-pulse rounded-lg bg-brand-border" />
              <div className="h-4 w-3/4 animate-pulse rounded-lg bg-brand-border" />
            </div>
            <div className="space-y-3">
              <div className="h-6 w-36 animate-pulse rounded-xl bg-brand-border" />
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-10 animate-pulse rounded-xl bg-brand-border" />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="h-80 animate-pulse rounded-2xl bg-brand-border" />
          </div>
        </div>
      </div>
    </main>
  );
}
