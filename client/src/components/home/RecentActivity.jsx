import { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react";

import { getItems } from "../../services/itemService";

export default function RecentActivity() {
  const [activeTab, setActiveTab] = useState("lost");
const [items, setItems] = useState([]);
useEffect(() => {
    fetchItems();
}, []);

const fetchItems = async () => {
    try {
        const data = await getItems();
        setItems(data);
    } catch (error) {
        console.error(error);
    }
};
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Recent Activity</h2>
          <p className="text-gray-500">Check out the latest lost and found items</p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveTab('lost')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'lost'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Lost Items
            </button>
            <button
              onClick={() => setActiveTab('found')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'found'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Found Items
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {items
.filter(item =>
    activeTab === "lost"
        ? item.type === "Lost"
        : item.type === "Found"
)
.slice(0,4)
.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
        
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            View All Items
          </button>
        </div>
      </div>
    </section>
  );
};
