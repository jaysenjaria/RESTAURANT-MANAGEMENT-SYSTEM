import { useState } from 'react'

export default function PreviousOrders({ previousOrders }) {
  const [expandedOrderId, setExpandedOrderId] = useState(null)

  const toggleExpanded = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  return (
    <section className="mt-6 space-y-4">
      {previousOrders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-sm text-slate-600">
          No previous paid orders yet.
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {previousOrders.slice(0, 10).map((order) => (
              <button
                key={order.id}
                onClick={() => toggleExpanded(order.id)}
                className="text-left rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:shadow-md hover:border-slate-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900">Order #{order.id}</h4>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                        Paid
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{order.type} • {order.tableId} • {order.items.length} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">₹{order.total}</p>
                    {order.paymentMethod && (
                      <p className="text-xs text-slate-500 capitalize">{order.paymentMethod}</p>
                    )}
                  </div>
                </div>

                {expandedOrderId === order.id && (
                  <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-2xl bg-white p-3">
                        <div>
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-500">₹{item.price}</p>
                        </div>
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">×{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>

          {previousOrders.length > 10 && (
            <p className="text-center text-sm text-slate-500">
              ...and {previousOrders.length - 10} more previous orders
            </p>
          )}
        </>
      )}
    </section>
  )
}
