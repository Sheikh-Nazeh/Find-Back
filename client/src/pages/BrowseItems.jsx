import Navbar from "../components/layout/Navbar";
import ItemCard from "../components/items/ItemCard";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getItems } from "../services/itemService";



export default function BrowseItems() {
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [itemType, setItemType] = useState(searchParams.get("type") || "all");

useEffect(() => {

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchItems();

}, []);

useEffect(() => {
  const nextParams = new URLSearchParams();

  if (searchTerm.trim()) {
    nextParams.set("q", searchTerm.trim());
  }

  if (location.trim()) {
    nextParams.set("location", location.trim());
  }

  if (itemType !== "all") {
    nextParams.set("type", itemType);
  }

  setSearchParams(nextParams, { replace: true });
}, [searchTerm, location, itemType, setSearchParams]);

const filteredItems = items.filter((item) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const normalizedLocation = location.trim().toLowerCase();
  const normalizedType = item.type?.toLowerCase();

  const matchesSearch =
    !normalizedSearch ||
    item.title?.toLowerCase().includes(normalizedSearch) ||
    item.category?.toLowerCase().includes(normalizedSearch);

  const matchesLocation =
    !normalizedLocation ||
    item.location?.toLowerCase().includes(normalizedLocation);

  const matchesType =
    itemType === "all" ||
    normalizedType === itemType;

  return matchesSearch && matchesLocation && matchesType;
});

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
        <div className="grid md:grid-cols-[1fr_1fr_auto] gap-3 mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by item name or category..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Filter by location..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 bg-white"
          >
            <option value="all">All items</option>
            <option value="lost">Lost items</option>
            <option value="found">Found items</option>
          </select>
        </div>

        {/* Grid */}
        {filteredItems.length === 0 ? (
          <div className="border border-gray-200 rounded-2xl p-10 text-center text-gray-500">
            No items match your search.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
          </div>
        )}
      </div>
    </>
  );
}
