import ProductCard from './ProductCard'

export default function OrderView({
  tables,
  selectedTableId,
  setSelectedTableId,
  products,
  cart,
  search,
  category,
  setSearch,
  setCategory,
  addToCart,
  updateCartQuantity,
  clearCart,
  placeOrder,
  selectedTable,
  cartTotal,
  editingOrderId,
  cancelEdit,
  onAddProduct
}) {
  return (
    <section className="space-y-4">
      <div className="rounded-3xl bg-white/90 p-5 shadow-sm shadow-slate-200/50">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Selected table</p>
            <div className="max-h-36 overflow-y-auto pr-2">
              <div className="flex flex-wrap gap-3">
                <button
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    selectedTableId === 'Takeaway'
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  onClick={() => setSelectedTableId('Takeaway')}
                >
                  Takeaway
                </button>
                {tables.map((table) => (
                  <button
                    key={table.id}
                    className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                      selectedTableId === table.id
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    onClick={() => setSelectedTableId(table.id)}
                  >
                    {table.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">{selectedTable ? `${selectedTable.id} • ${selectedTable.seats} seats` : 'Takeaway'}</p>
            <p>{selectedTableId === 'Takeaway' ? 'Takeaway order' : `Status: ${selectedTable?.status}`}</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 shadow-inner placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 sm:max-w-md"
            />
            <div className="flex flex-wrap gap-2">
              {['Food', 'Beverages', 'Desserts', 'Snacks'].map((name) => (
                <button
                  key={name}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    category === name
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  onClick={() => setCategory(name)}
                >
                  {name}
                </button>
              ))}
              <button
                className="rounded-full bg-slate-800 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                onClick={onAddProduct}
              >
                + Add Item
              </button>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={() => addToCart(product)} />
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Current order</h3>
                <span className="text-sm text-slate-500">{cart.length} items</span>
              </div>
              {cart.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-6 text-center text-sm text-slate-600">
                  Add products to create a new order.
                </div>
              ) : (
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p className="text-sm text-slate-500">₹{item.price}</p>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 p-1.5 text-sm text-slate-700">
                          <button className="h-8 w-8 rounded-full bg-slate-200 transition hover:bg-slate-300" onClick={() => updateCartQuantity(item.id, -1)}>-</button>
                          <span className="min-w-[1.25rem] text-center">{item.quantity}</span>
                          <button className="h-8 w-8 rounded-full bg-slate-200 transition hover:bg-slate-300" onClick={() => updateCartQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-700">
                  <span>Subtotal</span>
                  <strong className="text-base text-slate-900">₹{cartTotal}</strong>
                </div>
                <button
                  className="w-full rounded-3xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
                  onClick={placeOrder}
                  disabled={cart.length === 0}
                >
                  {editingOrderId ? `Update Order #${editingOrderId}` : 'Send to Kitchen'}
                </button>
                {editingOrderId ? (
                  <button
                    className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    onClick={cancelEdit}
                  >
                    Cancel Edit
                  </button>
                ) : (
                  <button
                    className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    onClick={clearCart}
                  >
                    Clear Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
