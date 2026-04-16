import { useState } from 'react'

export default function AddTableModal({ onClose, onAdd }) {
  const [id, setId] = useState('')
  const [seats, setSeats] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (!id.trim()) {
      setError('Table ID is required')
      return
    }
    
    if (!seats || seats < 1) {
      setError('Seats must be at least 1')
      return
    }

    onAdd({ id: id.trim(), seats: Number(seats) })
    setId('')
    setSeats('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Add New Table</h2>
        {error && (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Table ID (e.g., T7)</label>
            <input
              type="text"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter table ID"
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Seats</label>
            <input
              type="number"
              required
              min="1"
              max="20"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              placeholder="Enter number of seats"
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition"
            >
              Add Table
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
