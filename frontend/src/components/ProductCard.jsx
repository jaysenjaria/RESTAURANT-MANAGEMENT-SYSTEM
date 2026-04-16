export default function ProductCard({ product, onAdd }) {
  const getProductLogo = (product) => {
    const name = product.name?.toLowerCase() || '';
    
    // Match specific products by name
    if (name.includes('pizza')) return '🍕';
    if (name.includes('pasta')) return '🍝';
    if (name.includes('burger')) return '🍔';
    if (name.includes('sandwich')) return '🥪';
    if (name.includes('salad')) return '🥗';
    if (name.includes('cold coffee')) return '🥤';
    if (name.includes('coffee')) return '☕';
    if (name.includes('juice')) return '🍹';
    if (name.includes('water')) return '💧';
    if (name.includes('cake')) return '🍰';
    if (name.includes('ice cream')) return '🍨';
    if (name.includes('brownie')) return '🥮';
    if (name.includes('fries')) return '🍟';
    if (name.includes('wrap')) return '🌯';
    if (name.includes('tea')) return '🍵';
    if (name.includes('shake')) return '🥤';

    // Fallback by category
    switch (product.category) {
      case 'Food': return '🍽️';
      case 'Beverages': return '🧃';
      case 'Desserts': return '🍮';
      case 'Snacks': return '🍿';
      default: return '🛍️';
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-3xl font-semibold text-orange-600">
        {getProductLogo(product)}
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-900">{product.name}</h3>
        <p className="text-sm text-slate-500">₹{product.price}</p>
      </div>
      <button
        className="mt-auto inline-flex items-center justify-center rounded-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  )
}
