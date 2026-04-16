export default function KitchenDisplay({ currentKitchenOrders, onMarkReady, onEdit }) {
  return (
    <section className="space-y-4">
      <div className="grid gap-4">
        {currentKitchenOrders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-sm text-slate-600">
            No sent orders in kitchen.
          </div>
        ) : (
          currentKitchenOrders.map((order) => (
            <div key={order.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">Order #{order.id}</h4>
                    <p className="text-sm text-slate-600">{order.tableId} • {order.type}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">₹{order.total}</span>
                </div>

                <div className="space-y-2">
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
              </div>

              <div className="mt-5 flex gap-3 justify-end">
                <button
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  onClick={() => onEdit(order.id)}
                >
                  Edit
                </button>
                <button
                  className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                  onClick={() => onMarkReady(order.id)}
                >
                  Mark Ready
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
