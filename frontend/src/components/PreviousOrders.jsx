export default function PaymentModal({ isOpen, orderId, onConfirm, onCancel }) {
  if (!isOpen) return null

  const tableDisplay = orderId?.tableId || 'Order'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-3xl bg-white p-8 shadow-2xl">
        <h3 className="mb-6 text-2xl font-semibold text-slate-900">Select Payment Method</h3>
        <p className="mb-8 text-slate-600">How would you like to pay for {tableDisplay}?</p>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            className="flex items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-6 text-left transition hover:border-orange-400 hover:bg-orange-50"
            onClick={() => onConfirm('cash')}
          >
            <div className="text-3xl">💵</div>
            <div>
              <p className="font-semibold text-slate-900">Cash</p>
              <p className="text-sm text-slate-500">Pay with cash</p>
            </div>
          </button>

          <button
            className="flex items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-6 text-left transition hover:border-orange-400 hover:bg-orange-50"
            onClick={() => onConfirm('upi')}
          >
            <div className="text-3xl">📱</div>
            <div>
              <p className="font-semibold text-slate-900">UPI</p>
              <p className="text-sm text-slate-500">Pay with UPI</p>
            </div>
          </button>
        </div>

        <button
          className="mt-6 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
