const navItems = ['Floor View', 'Order View', 'Bills', 'Kitchen Display', 'Previous Orders']

export default function Sidebar({ view, setView }) {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 overflow-y-auto bg-slate-950/95 text-slate-100 shadow-lg shadow-slate-900/20 lg:block">
      <div className="flex items-center gap-4 border-b border-slate-800/80 px-6 py-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-orange-500 text-lg shadow-lg shadow-orange-500/20">
          🍽️
        </div>
        <div>
          <h1 className="text-xl font-semibold">POS Cafe</h1>
          <p className="text-sm text-slate-300">Restaurant management</p>
        </div>
      </div>

      <nav className="space-y-2 px-6 py-6">
        {navItems.map((name) => (
          <button
            key={name}
            className={`w-full rounded-3xl px-4 py-3 text-left text-sm font-medium transition ${
              view === name
                ? 'bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/20'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
            onClick={() => setView(name)}
          >
            {name}
          </button>
        ))}
      </nav>
    </aside>
  )
}
