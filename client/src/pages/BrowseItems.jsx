import Navbar from "../components/layout/Navbar";
import ItemCard from "../components/items/ItemCard";

import { items } from "../data/items";

export default function BrowseItems() {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Browse Items
          </h1>

          <p className="text-gray-500 mt-2">
            Search and explore lost and found items.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search items..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}