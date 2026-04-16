export default function TopBar({ title }) {
  return (
    <header className="mb-0 rounded-3xl bg-white/90 px-6 py-3 shadow-sm shadow-slate-200/50 backdrop-blur">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      </div>
    </header>
  )
}
