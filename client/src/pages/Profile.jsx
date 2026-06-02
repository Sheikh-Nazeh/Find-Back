import Navbar from "../components/layout/Navbar";
import { User, Package, Search, CheckCircle } from "lucide-react";

export default function Profile() {
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <User size={40} className="text-blue-600" />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                John Doe
              </h1>

              <p className="text-gray-500 mt-1">
                john@example.com
              </p>
            </div>

            <button className="px-6 py-3 bg-gray-900 text-white rounded-xl">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <Package className="text-red-500 mb-3" />
            <h3 className="text-3xl font-bold">5</h3>
            <p className="text-gray-500">Lost Reports</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <Search className="text-green-500 mb-3" />
            <h3 className="text-3xl font-bold">3</h3>
            <p className="text-gray-500">Found Reports</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <CheckCircle className="text-blue-500 mb-3" />
            <h3 className="text-3xl font-bold">2</h3>
            <p className="text-gray-500">Successful Returns</p>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">
            <div className="border rounded-xl p-4">
              Lost Item Reported - iPhone 14 Pro
            </div>

            <div className="border rounded-xl p-4">
              Found Item Reported - Black Wallet
            </div>

            <div className="border rounded-xl p-4">
              Claim Request Submitted
            </div>
          </div>
        </div>
      </div>
    </>
  );
}