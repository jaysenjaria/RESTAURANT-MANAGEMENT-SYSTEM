const BASE_URL = '/api'

async function handleResponse(response) {
  const contentType = response.headers.get('Content-Type') || ''
  const data = contentType.includes('application/json') ? await response.json() : null

  if (!response.ok) {
    const message = data?.error || response.statusText || 'Request failed.'
    throw new Error(message)
  }

  return data
}

export function getTables() {
  return fetch(`${BASE_URL}/tables`).then(handleResponse)
}

export function addTable(tableData) {
  return fetch(`${BASE_URL}/tables`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tableData)
  }).then(handleResponse)
}

export function getProducts() {
  return fetch(`${BASE_URL}/products`).then(handleResponse)
}

export function addProduct(productData) {
  return fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  }).then(handleResponse)
}

export function getOrders() {
  return fetch(`${BASE_URL}/orders`).then(handleResponse)
}

export function submitOrder(orderData) {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  }).then(handleResponse)
}

export function patchOrderStatus(orderId, status, paymentMethod = null) {
  return fetch(`${BASE_URL}/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, paymentMethod })
  }).then(handleResponse)
}

export function updateOrderItems(orderId, items) {
  return fetch(`${BASE_URL}/orders/${orderId}/items`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  }).then(handleResponse)
}

export function toggleTable(tableId) {
  return fetch(`${BASE_URL}/tables/${tableId}/toggle`, {
    method: 'PATCH'
  }).then(handleResponse)
}
