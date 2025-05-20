import { notFound } from 'next/navigation'

type Item = {
  id: string
  name: string
  price: string
  image: string
  active: boolean
  seller: string
  brand: string
  model: string
  color: string
  category: string
  description: string
}

// runs on the server
async function getItem(id: string): Promise<Item | null> {
  const res = await fetch(`http://localhost:3000/api/favorites/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) return null
  return res.json()
}

export default async function ItemPage({ params }: { params: { id: string } }) {
  const item = await getItem(params.id)

  if (!item) return notFound()

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 text-xl font-semibold flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full" /> {/* Logo */}
            <span>Dashboard</span>
          </div>
          <nav className="mt-6">
            <ul className="space-y-2 px-4">
              <li className="bg-gray-800 p-2 rounded">Dashboard</li>
              <li className="hover:bg-gray-800 p-2 rounded">Browse</li>
              <li className="hover:bg-gray-800 p-2 rounded">Cart</li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-600" />
            <div>
              <p className="text-sm font-medium">Louis Rainey</p>
              <a href="#" className="text-xs text-gray-400 hover:text-white">
                View profile
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 flex gap-8">
        {/* Product Info */}
        <div className="w-2/3 space-y-6">
          {/* Product Header with Image */}
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <h1 className="text-2xl font-bold">{item.name}</h1>
              <p className="text-gray-600">{item.brand}</p>
            </div>
          </div>

          {/* Product Details Card */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Product Information</h2>
            <ul className="grid grid-cols-2 gap-4 text-sm">
              <li><strong>Brand:</strong> {item.brand}</li>
              <li><strong>Model Name:</strong> {item.model}</li>
              <li><strong>Color:</strong> {item.color}</li>
              <li><strong>Category:</strong> {item.category}</li>
            </ul>

            <div className="mt-4 text-sm text-gray-700 whitespace-pre-line">
              {item.description}
            </div>
          </div>
        </div>

        {/* Purchase Sidebar */}
        <div className="w-1/3 bg-white p-6 rounded shadow h-fit">
          <div className="text-sm text-gray-700 mb-2">Buy new:</div>
          <div className="text-3xl font-bold mb-2">${Number(item.price).toFixed(2)}</div>
          <div className="text-green-600 font-medium text-sm mb-2">✓ Prime Same-Day</div>
          <a href="#" className="text-blue-600 text-sm underline">FREE Returns</a>

          <div className="mt-4 text-sm">
            <p>FREE delivery <strong>Today 2 PM - 6 PM</strong></p>
            <p className="text-gray-600">. Order within <span className="text-green-700">1 hr 15 mins</span></p>
          </div>

          <div className="text-blue-600 text-sm mt-2 underline">
            Deliver to Louis Rainey
          </div>

          <div className="text-green-700 mt-4">In Stock</div>

          <div className="mt-4">
            <label className="block mb-1 text-sm font-medium">Qty:</label>
            <select className="w-full border rounded px-2 py-1 text-sm">
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
            </select>
          </div>

          <div className="mt-4 space-y-2">
            <button className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">Add to Cart</button>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Buy Now</button>
          </div>
        </div>
      </main>
    </div>
  )
}
