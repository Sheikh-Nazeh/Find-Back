import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AdminSidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-6 flex flex-col">

      <div>
        <h2 className="text-2xl font-bold mb-8">
          Admin Panel
        </h2>

        <div className="space-y-3">
          <Link
            to="/admin"
            className="block p-3 rounded-lg hover:bg-gray-800"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="block p-3 rounded-lg hover:bg-gray-800"
          >
            Manage Users
          </Link>

          <Link
            to="/admin/items"
            className="block p-3 rounded-lg hover:bg-gray-800"
          >
            Manage Items
          </Link>

          <Link
            to="/admin/reports"
            className="block p-3 rounded-lg hover:bg-gray-800"
          >
            Manage Reports
          </Link>

          <Link
            to="/admin/claims"
            className="block p-3 rounded-lg hover:bg-gray-800"
          >
            Manage Claims
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-auto pt-8">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium"
        >
          Logout
        </button>
      </div>

    </div>
  );
}