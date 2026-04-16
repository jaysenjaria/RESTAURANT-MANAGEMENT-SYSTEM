export default function BillsView({ ordersWaitingPayment, onPay, onEdit }) {
  return (
    <section className="space-y-4">
      <div className="grid gap-4">
        {ordersWaitingPayment.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-sm text-slate-600">
            No bills waiting for payment.
          </div>
        ) : (
          ordersWaitingPayment.map((bill) => (
            <div key={bill.tableId} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">Table {bill.tableId}</h4>
                    <p className="text-sm text-slate-500">{bill.type}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                    Ready
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Items</p>
                  {bill.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                      <div>
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">₹{item.price}</p>
                      </div>
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">×{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Total:</span>
                    <strong className="text-lg text-orange-600">₹{bill.total}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-3 justify-end">
                <button
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  onClick={() => onEdit(bill.orderIds[0])}
                >
                  Edit
                </button>
                <button
                  className="rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                  onClick={() => onPay(bill.orderIds, bill.tableId)}
                >
                  Pay Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
