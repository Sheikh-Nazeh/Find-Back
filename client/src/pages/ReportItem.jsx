import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  Package,
  MapPin,
  Calendar,
  FileText,
  Upload,
} from "lucide-react";

export default function ReportItem() {
  const [activeTab, setActiveTab] = useState("lost");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-600">
              <ArrowLeft size={20} />
            </Link>

            <Link to="/" className="flex items-center gap-2">
              <Search className="w-6 h-6 text-blue-600" />
              <span className="text-2xl font-medium text-gray-900">
                Find Back
              </span>
            </Link>
          </div>

          <Link
            to="/"
            className="text-sm font-medium text-gray-700"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">
              Report an Item
            </h1>

            <p className="text-gray-500">
              Help reunite lost belongings with their owners
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
            {/* Toggle */}
            <div className="bg-gray-100 rounded-full p-1 flex mb-8">
              <button
                onClick={() => setActiveTab("lost")}
                className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${
                  activeTab === "lost"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-500"
                }`}
              >
                Report Lost
              </button>

              <button
                onClick={() => setActiveTab("found")}
                className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${
                  activeTab === "found"
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-500"
                }`}
              >
                Report Found
              </button>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Item Name
                </label>

                <div className="relative">
                  <Package
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="e.g. iPhone 14 Pro"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>

                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
                  <option>Electronics</option>
                  <option>Wallet</option>
                  <option>Keys</option>
                  <option>Bag</option>
                  <option>Jewelry</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder={
                      activeTab === "lost"
                        ? "Where did you lose it?"
                        : "Where did you find it?"
                    }
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Date
                </label>

                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-4 top-4 text-gray-400"
                  />

                  <textarea
                    rows="4"
                    placeholder="Describe the item..."
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload Image
                </label>

                <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center cursor-pointer hover:bg-gray-50">
                  <Upload
                    size={28}
                    className="text-gray-400 mb-2"
                  />

                  <span className="text-sm text-gray-500">
                    Click to upload an image
                  </span>

                  <input
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl text-white font-semibold ${
                  activeTab === "lost"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {activeTab === "lost"
                  ? "Submit Lost Item"
                  : "Submit Found Item"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}