import { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import FloorView from './components/FloorView'
import OrderView from './components/OrderView'
import BillsView from './components/BillsView'
import KitchenDisplay from './components/KitchenDisplay'
import PreviousOrders from './components/PreviousOrders'
import PaymentModal from './components/PaymentModal'
import AddProductModal from './components/AddProductModal'
import AddTableModal from './components/AddTableModal'
import { getOrders, getProducts, getTables, patchOrderStatus, submitOrder, toggleTable, updateOrderItems, addProduct, addTable } from './services/api'

const initialTables = [
  { id: 'T1', seats: 4, status: 'free' },
  { id: 'T2', seats: 4, status: 'free' },
  { id: 'T3', seats: 4, status: 'free' },
  { id: 'T4', seats: 4, status: 'free' },
  { id: 'T5', seats: 6, status: 'free' },
  { id: 'T6', seats: 6, status: 'free' }
]

const initialProducts = [
  { id: 'p1', name: 'Pizza Margherita', category: 'Food', price: 350 },
  { id: 'p2', name: 'Pasta Arrabbiata', category: 'Food', price: 280 },
  { id: 'p3', name: 'Burger Classic', category: 'Food', price: 220 },
  { id: 'p4', name: 'Grilled Sandwich', category: 'Food', price: 180 },
  { id: 'p5', name: 'Caesar Salad', category: 'Food', price: 200 },
  { id: 'p6', name: 'Coffee', category: 'Beverages', price: 80 },
  { id: 'p7', name: 'Cold Coffee', category: 'Beverages', price: 120 },
  { id: 'p8', name: 'Fresh Juice', category: 'Beverages', price: 100 },
  { id: 'p9', name: 'Mineral Water', category: 'Beverages', price: 30 },
  { id: 'p10', name: 'Chocolate Cake', category: 'Desserts', price: 250 },
  { id: 'p11', name: 'Ice Cream', category: 'Desserts', price: 190 },
  { id: 'p12', name: 'Brownie', category: 'Desserts', price: 220 },
  { id: 'p13', name: 'French Fries', category: 'Snacks', price: 120 },
  { id: 'p14', name: 'Paneer Wrap', category: 'Snacks', price: 180 }
]

function App() {
  const [view, setView] = useState('Floor View')
  const [tables, setTables] = useState(initialTables)
  const [products, setProducts] = useState(initialProducts)
  const [orders, setOrders] = useState([])
  const [cart, setCart] = useState([])
  const [selectedTableId, setSelectedTableId] = useState('Takeaway')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Food')
  const [message, setMessage] = useState('')
  const [editingOrderId, setEditingOrderId] = useState(null)
  const [editingOrderTableId, setEditingOrderTableId] = useState(null)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [paymentOrderId, setPaymentOrderId] = useState(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [isAddingTable, setIsAddingTable] = useState(false)

  const handleAddProduct = async (productData) => {
    try {
      await addProduct(productData)
      await loadData()
      setIsAddingProduct(false)
      showMessage('Product added successfully.')
    } catch (error) {
      console.error(error)
      showMessage(error.message)
    }
  }

  const handleAddTable = async (tableData) => {
    try {
      await addTable(tableData)
      await loadData()
      setIsAddingTable(false)
      showMessage(`Table ${tableData.id} added successfully.`)
    } catch (error) {
      console.error(error)
      showMessage(error.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const showMessage = (text) => {
    setMessage(text)
    setTimeout(() => setMessage(''), 4000)
  }

  const loadData = async () => {
    try {
      const [tablesRes, productsRes, ordersRes] = await Promise.all([
        getTables(),
        getProducts(),
        getOrders()
      ])
      setTables(tablesRes)
      setProducts(productsRes)
      setOrders(ordersRes)
    } catch (error) {
      console.error(error)
      showMessage('Unable to load backend data. Using local demo data.')
    }
  }

  const selectedTable = tables.find((table) => table.id === selectedTableId) || null

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = category === 'All' || product.category === category
        return matchesSearch && matchesCategory
      }),
    [products, search, category]
  )

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id)
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  const updateCartQuantity = (productId, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const clearCart = () => setCart([])

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const placeOrder = async () => {
    if (cart.length === 0) {
      return showMessage('Add items to the cart before sending to kitchen.')
    }

    const itemsPayload = cart.map(({ id, name, price, quantity }) => ({
      productId: id,
      name,
      price,
      quantity
    }))

    try {
      if (editingOrderId) {
        await updateOrderItems(editingOrderId, itemsPayload)
        await loadData()
        setEditingOrderId(null)
        setEditingOrderTableId(null)
        clearCart()
        showMessage(`Order #${editingOrderId} updated.`)
        setView('Kitchen Display')
      } else {
        const payload = {
          tableId: selectedTableId,
          type: selectedTableId === 'Takeaway' ? 'Takeaway' : 'Dine-in',
          items: itemsPayload
        }
        await submitOrder(payload)
        await loadData()
        clearCart()
        showMessage('Order sent to kitchen.')
        setView('Kitchen Display')
      }
    } catch (error) {
      console.error(error)
      showMessage(error.message)
    }
  }

  const updateOrderStatus = async (orderId, status, paymentMethod = null) => {
    try {
      await patchOrderStatus(orderId, status, paymentMethod)
      await loadData()
      if (status === 'ready') {
        showMessage(`Order #${orderId} marked ready.`)
      } else if (status === 'paid') {
        showMessage(`Order #${orderId} paid via ${paymentMethod}.`)
      }
    } catch (error) {
      console.error(error)
      showMessage(error.message)
    }
  }

  const handlePayClick = (orderIds, tableId) => {
    setPaymentOrderId({ orderIds: Array.isArray(orderIds) ? orderIds : [orderIds], tableId })
    setPaymentModalOpen(true)
  }

  const handlePaymentConfirm = async (paymentMethod) => {
    if (paymentOrderId && paymentOrderId.orderIds) {
      try {
        await Promise.all(
          paymentOrderId.orderIds.map((orderId) =>
            patchOrderStatus(orderId, 'paid', paymentMethod)
          )
        )
        await loadData()
        showMessage(`Table ${paymentOrderId.tableId} paid via ${paymentMethod}.`)
        setPaymentModalOpen(false)
        setPaymentOrderId(null)
      } catch (error) {
        console.error(error)
        showMessage(error.message)
      }
    }
  }

  const handlePaymentCancel = () => {
    setPaymentModalOpen(false)
    setPaymentOrderId(null)
  }

  const handleToggleTable = async (tableId) => {
    try {
      await toggleTable(tableId)
      await loadData()
    } catch (error) {
      console.error(error)
      showMessage(error.message)
    }
  }

  const startEditOrder = (orderId) => {
    const order = orders.find((o) => o.id === orderId)
    if (order) {
      setEditingOrderId(orderId)
      setEditingOrderTableId(order.tableId)
      setSelectedTableId(order.tableId)
      setCart(order.items.map((item) => ({ ...item })))
      setView('Order View')
    }
  }

  const cancelEdit = () => {
    setEditingOrderId(null)
    setEditingOrderTableId(null)
    clearCart()
  }

  const ordersWaitingPayment = (() => {
    const readyOrders = orders.filter((order) => order.status === 'ready')
    const grouped = {}
    
    readyOrders.forEach((order) => {
      const key = order.tableId
      if (!grouped[key]) {
        grouped[key] = {
          tableId: order.tableId,
          type: order.type,
          orderIds: [],
          items: [],
          total: 0
        }
      }
      grouped[key].orderIds.push(order.id)
      grouped[key].items.push(...order.items)
      grouped[key].total += order.total
    })
    
    return Object.values(grouped)
  })()
  const currentKitchenOrders = orders.filter((order) => order.status === 'sent')
  const previousOrders = orders.filter((order) => order.status === 'paid').sort((a, b) => b.id - a.id)

  return (
    <div className="min-h-screen bg-[#f8efe4] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar view={view} setView={setView} />
        <main className="ml-0 flex-1 lg:ml-72">
          <div className="sticky top-0 z-40 bg-[#f8efe4] px-6 pt-3 pb-0 sm:px-8 sm:pt-3 sm:pb-0 xl:px-10 xl:pt-3 xl:pb-0">
            <TopBar title={view} />
            {message && (
              <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 px-6 py-4 text-sm text-orange-800 shadow-sm">
                {message}
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 xl:p-10 pt-0">

          {view === 'Floor View' && (
            <FloorView
              tables={tables}
              onSelectTable={setSelectedTableId}
              onToggleTable={handleToggleTable}
              onOpenOrderView={(tableId) => {
                setSelectedTableId(tableId)
                setView('Order View')
              }}
              onAddTable={() => setIsAddingTable(true)}
            />
          )}

          {view === 'Order View' && (
            <OrderView
              tables={tables}
              selectedTableId={selectedTableId}
              setSelectedTableId={setSelectedTableId}
              products={filteredProducts}
              cart={cart}
              search={search}
              category={category}
              setSearch={setSearch}
              setCategory={setCategory}
              addToCart={addToCart}
              updateCartQuantity={updateCartQuantity}
              clearCart={clearCart}
              placeOrder={placeOrder}
              selectedTable={selectedTable}
              cartTotal={cartTotal}
              editingOrderId={editingOrderId}
              cancelEdit={cancelEdit}
              onAddProduct={() => setIsAddingProduct(true)}
            />
          )}

          {view === 'Bills' && (
            <BillsView
              ordersWaitingPayment={ordersWaitingPayment}
              onPay={handlePayClick}
              onEdit={startEditOrder}
            />
          )}

          {view === 'Kitchen Display' && (
            <KitchenDisplay
              currentKitchenOrders={currentKitchenOrders}
              onMarkReady={(id) => updateOrderStatus(id, 'ready')}
              onEdit={startEditOrder}
            />
          )}

          {view === 'Previous Orders' && (
            <PreviousOrders previousOrders={previousOrders} />
          )}
          </div>
        </main>
      </div>

      <PaymentModal
        isOpen={paymentModalOpen}
        orderId={paymentOrderId}
        onConfirm={handlePaymentConfirm}
        onCancel={handlePaymentCancel}
      />

      {isAddingProduct && (
        <AddProductModal
          onClose={() => setIsAddingProduct(false)}
          onAdd={handleAddProduct}
        />
      )}

      {isAddingTable && (
        <AddTableModal
          onClose={() => setIsAddingTable(false)}
          onAdd={handleAddTable}
        />
      )}
    </div>
  )
}

export default App
