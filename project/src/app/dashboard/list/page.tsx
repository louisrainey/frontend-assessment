// using swr to lead data client
'use client';

import useSWR from 'swr';
import Link from 'next/link';
import styles from './page.module.css'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ListPage() {
  const { data, error, isLoading } = useSWR('/api/favorites', fetcher);

  if (error) return <div>Failed to load items</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-start bg-gray-900 text-white px-6 py-4 space-x-8">
        {/* Dashboard button (active) */}
        <Link href="/dashboard/list" className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded cursor-pointer">
          <span>Dashboard</span>
        </Link>

        {/* Browse button */}
        <Link href="/dashboard/browse" className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded cursor-pointer">
          <span>Browse</span>
        </Link>

        {/* Cart button */}
        <Link href="/dashboard/cart" className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded cursor-pointer">
          <span>Cart</span>
        </Link>
      </nav>
      {/*list view*/}
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">Favorites</h2>
            <p className="text-sm text-gray-500">A list of your favorite items to keep track of.</p>
          </div>
          <button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-2 rounded">
            + Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-600 border-b">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Seller</th>
                <th className="py-2">Status</th>
                <th className="py-2">Price</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3">
  <Link href={`/item/${item.id}`} className="flex items-center gap-3 hover:underline">
    <img
      src={item.image}
      alt="Item"
      width={32}
      height={32}
      className="rounded-full"
    />
    <span className="font-medium text-stone-900">{item.name}</span>
  </Link>
</td>
                  

                  <td className="py-3">
                  <span
          className={
            item.active
              ? "bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold"
              : "bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold"
          }
        >
          {item.active ? "Active" : "Inactive"}
        </span>
                  </td>
                  <td className="py-3 font-medium text-stone-900">${item.price}</td>
                  <td className="py-3 text-right">
                    <button className="text-red-600 hover:underline">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}