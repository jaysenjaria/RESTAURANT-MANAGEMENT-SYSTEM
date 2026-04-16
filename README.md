# Restaurant POS

This project is a restaurant management system with separate backend and frontend folders.

## Structure

- `backend/` - Node.js Express API for tables, products, orders, and billing.
- `frontend/` - React + Vite POS interface.

## Run locally

1. Open two terminals.
2. In `backend/`:
   - `npm install`
   - `npm run dev`
3. In `frontend/`:
   - `npm install`
   - `npm run dev`

The frontend proxies `/api` requests to `http://localhost:5000`.

## Notes

- Orders are stored in memory in the backend for demo purposes.
- Use the Floor View to toggle table status.
- In Order View, select a table or Takeaway, add items, and send them to the kitchen.
- Kitchen Display shows sent orders and allows marking them ready.
- Bills view shows orders waiting for payment.
