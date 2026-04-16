export default function FloorView({ tables, onSelectTable, onToggleTable, onOpenOrderView, onAddTable }) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Floor Management</h2>
        <button
          onClick={onAddTable}
          className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition"
        >
          + Add Table
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tables.map((table) => {
          const statusStyles =
            table.status === 'free'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-rose-200 bg-rose-50 text-rose-900'

          return (
            <button
              key={table.id}
              className={`group rounded-3xl border p-6 text-left transition hover:-translate-y-0.5 hover:shadow-lg ${statusStyles}`}
              onClick={() => onSelectTable(table.id)}
              onContextMenu={(event) => {
                event.preventDefault()
                if (table.status === 'free') {
                  onOpenOrderView(table.id)
                } else {
                  onToggleTable(table.id)
                }
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">{table.id}</h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  {table.status}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600">{table.seats} seats</p>
              <p className="mt-5 text-xs text-slate-500">Right-click to {table.status === 'free' ? 'order' : 'toggle'}</p>
            </button>
          )
        })}
      </div>
    </section>
  )
}
