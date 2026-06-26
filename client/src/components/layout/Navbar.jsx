import { Search, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);
return ( <nav className="bg-white border-b border-gray-100"> <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* Logo */}
    <Link to="/" className="flex items-center gap-2">
      <Search className="w-5 h-5 text-blue-600" />
      <span className="text-xl font-semibold text-gray-900">
        Find Back
      </span>
    </Link>

    {/* Navigation Links */}
    <div className="hidden md:flex items-center gap-8">
      <Link
        to="/"
        className="text-sm text-gray-600 hover:text-gray-900 transition"
      >
        Home
      </Link>

      <Link
        to="/browse"
        className="text-sm text-gray-600 hover:text-gray-900 transition"
      >
        Browse Items
      </Link>

      <Link
        to="/about"
        className="text-sm text-gray-600 hover:text-gray-900 transition"
      >
        About
      </Link>
    </div>

    {/* Right Side */}
<div className="flex items-center gap-4">

  {user ? (
    <Link
      to="/profile"
      className="text-gray-700 hover:text-gray-900"
      title="Profile"
    >
      <UserCircle size={30} />
    </Link>
  ) : (
    <Link
      to="/login"
      className="text-sm text-gray-600 hover:text-gray-900"
    >
      Sign In
    </Link>
  )}

  <Link
    to="/report"
    className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
  >
    Report Item
  </Link>

</div>
  </div>
</nav>
);
}
