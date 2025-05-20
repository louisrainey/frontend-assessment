
'use client';

import useSWR from 'swr';
import Link from 'next/link';
/*import {FaHome, FaSearch, FaShoppingCart} from 'react-icons/fa';*/
import styles from './page.module.css'
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CardPage() {
  const { data, error, isLoading } = useSWR('/api/favorites', fetcher);

  if (error) return <div>Failed to load items</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between py-6 px-4">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="bg-blue-500 w-8 h-8 rounded-full" />
            <span className="text-xl font-semibold">Dashboard</span>
          </div>

          {/* Nav links */}
          <nav className="space-y-4">
            <div className="flex items-center gap-3 bg-white/10 px-3 py-2 rounded">
              {/* Home icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m0 0H5a2 2 0 01-2-2v-4a2 2 0 012-2h3m6 6v-6m0 6h4a2 2 0 002-2v-4a2 2 0 00-2-2h-3"
                />
              </svg>
              <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded cursor-pointer">
              {/* Browse icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 4h13M8 9h13M8 14h13M8 19h13M3 4h.01M3 9h.01M3 14h.01M3 19h.01"
                />
              </svg>
              <span>Browse</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded cursor-pointer">
              {/* Cart icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13L17 13M7 13H5.4M17 13l1.5 7M9 21a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
              <span>Cart</span>
            </div>
          </nav>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-3 py-2 bg-white/10 rounded">
          <div className="w-8 h-8 rounded-full bg-gray-600" />
          <div>
            <p className="text-sm font-semibold">Louis Rainey</p>
            <p className="text-xs text-gray-300">View profile</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-between"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />

              <div className="text-center">
                <h3 className="text-md font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm">${item.price}</p>

                <span
                  className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    item.active
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {item.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="flex justify-between items-center w-full mt-6 border-t pt-4">
                <button className="text-red-600 hover:underline font-medium">
                  Remove
                </button>
                <Link
  href={`/item/${item.id}`}
  className="text-gray-900 hover:underline font-medium"
>
  View
</Link>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}