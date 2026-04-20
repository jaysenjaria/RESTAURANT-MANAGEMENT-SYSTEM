export default function OrderDetailsModal({ isOpen, order, onClose }) {
  if (!isOpen || !order) return null

  const formatOrderDateTime = (value) =>
    value ? new Date(value).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : ''

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
        <h3 className="mb-2 text-2xl font-semibold text-slate-900">Order #{order.id}</h3>

        <div className="mb-6 space-y-2 border-b border-slate-200 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Timestamps</p>
          <p className="text-sm text-slate-700">Placed {formatOrderDateTime(order.createdAt)}</p>
          <p className="text-sm text-slate-700">Ready {formatOrderDateTime(order.readyAt)}</p>
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Items</p>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
              <div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">₹{item.price}</p>
              </div>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">×{item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="mb-6 border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-900">Total:</span>
            <strong className="text-lg text-orange-600">₹{order.total}</strong>
          </div>
        </div>

        <button
          className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}
