import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const tables = [
  { id: 'T1', seats: 4, status: 'free' },
  { id: 'T2', seats: 4, status: 'free' },
  { id: 'T3', seats: 4, status: 'free' },
  { id: 'T4', seats: 4, status: 'free' },
  { id: 'T5', seats: 6, status: 'free' },
  { id: 'T6', seats: 6, status: 'free' }
]

const products = [
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

const orders = []
let nextOrderId = 1

app.get('/api/tables', (req, res) => {
  res.json(tables)
})

app.post('/api/tables', (req, res) => {
  const { id, seats } = req.body
  if (!id || seats == null) {
    return res.status(400).json({ error: 'id and seats are required.' })
  }
  const existing = tables.find((t) => t.id === id)
  if (existing) {
    return res.status(400).json({ error: 'Table ID already exists.' })
  }
  const newTable = {
    id,
    seats: Number(seats),
    status: 'free'
  }
  tables.push(newTable)
  res.status(201).json(newTable)
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.post('/api/products', (req, res) => {
  const { name, category, price } = req.body
  if (!name || !category || price == null) {
    return res.status(400).json({ error: 'Name, category, and price are required.' })
  }
  const newProduct = {
    id: `p${products.length + 1}`,
    name,
    category,
    price: Number(price)
  }
  products.push(newProduct)
  res.status(201).json(newProduct)
})

app.get('/api/orders', (req, res) => {
  const { status } = req.query
  if (status) {
    return res.json(orders.filter((order) => order.status === status))
  }
  res.json(orders)
})

app.post('/api/orders', (req, res) => {
  const { tableId, items, type } = req.body
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must include at least one product.' })
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const order = {
    id: nextOrderId++,
    tableId: type === 'Takeaway' ? 'Takeaway' : tableId || 'Takeaway',
    type: type || 'Dine-in',
    items,
    total,
    status: 'sent',
    createdAt: new Date().toISOString()
  }

  orders.push(order)

  if (order.tableId !== 'Takeaway') {
    const table = tables.find((t) => t.id === order.tableId)
    if (table) {
      table.status = 'occupied'
    }
  }

  res.status(201).json(order)
})

app.patch('/api/orders/:id/status', (req, res) => {
  const orderId = Number(req.params.id)
  const { status, paymentMethod } = req.body
  const order = orders.find((item) => item.id === orderId)

  if (!order) {
    return res.status(404).json({ error: 'Order not found.' })
  }
  if (!['sent', 'ready', 'paid'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' })
  }

  order.status = status
  if (paymentMethod) {
    order.paymentMethod = paymentMethod
  }

  if (status === 'paid' && order.tableId && order.tableId !== 'Takeaway') {
    const table = tables.find((t) => t.id === order.tableId)
    if (table) {
      table.status = 'free'
    }
  }

  res.json(order)
})

app.patch('/api/orders/:id/items', (req, res) => {
  const orderId = Number(req.params.id)
  const { items } = req.body
  const order = orders.find((item) => item.id === orderId)

  if (!order) {
    return res.status(404).json({ error: 'Order not found.' })
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must include at least one product.' })
  }

  order.items = items
  order.total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  res.json(order)
})

app.patch('/api/tables/:id/toggle', (req, res) => {
  const table = tables.find((item) => item.id === req.params.id)
  if (!table) {
    return res.status(404).json({ error: 'Table not found.' })
  }
  table.status = table.status === 'free' ? 'occupied' : 'free'
  res.json(table)
})

app.listen(PORT, () => {
  console.log(`Restaurant backend running on http://localhost:${PORT}`)
})
