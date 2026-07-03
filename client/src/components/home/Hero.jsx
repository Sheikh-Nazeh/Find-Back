import { Search, MapPin } from 'lucide-react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHomeStats } from "../../services/itemService";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("lost");
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    approved_items: 0,
    resolved_items: 0,
});
useEffect(() => {
    fetchStats();
}, []);

const fetchStats = async () => {
    try {
        const data = await getHomeStats();
        setStats(data);
    } catch (error) {
        console.error(error);
    }
};

const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (searchTerm.trim()) {
        params.set("q", searchTerm.trim());
    }

    if (location.trim()) {
        params.set("location", location.trim());
    }

    params.set("type", activeTab);

    navigate(`/browse?${params.toString()}`);
};

  return (
    <section className="relative bg-gradient-to-b from-blue-50/50 to-white pt-16 pb-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
          Reuniting People with Their Lost Items
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-8">
          A community-driven platform to help you find what you've lost and return what you've found
        </p>

        {/* Toggle */}
        <div className="inline-flex bg-gray-100 rounded-full p-1 mb-6">
          <button
            onClick={() => setActiveTab('lost')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'lost'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            I Lost Something
          </button>
          <button
            onClick={() => setActiveTab('found')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'found'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            I Found Something
          </button>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-2xl mx-auto mb-10"
        >
          <div className="flex items-center flex-1 w-full bg-white border border-gray-200 rounded-lg px-4 py-3">
            <Search className="w-4 h-4 text-gray-400 mr-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What are you looking for?"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center flex-1 w-full bg-white border border-gray-200 rounded-lg px-4 py-3">
            <MapPin className="w-4 h-4 text-gray-400 mr-3" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800"
          >
            Search
          </button>
        </form>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">{stats.approved_items.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">Items Reunited</div>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">{stats.users.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">Active Users</div>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">24/7</div>
            <div className="text-xs text-gray-500 mt-1">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};
