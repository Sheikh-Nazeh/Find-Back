import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";

import {
  User,
  Lock,
  Trash2,
  LogOut,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

import {
  getProfile,
  updateProfile,
} from "../services/authService";

export default function Profile() {

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

useEffect(() => {

  if (!user) {
    navigate("/login");
    return;
  }

  const fetchProfile = async () => {
    try {
      const data = await getProfile();

      setProfile({
        name: data.full_name,
        email: data.email,
        phone: data.phone || "",
      });

    } catch (error) {
      console.error("Profile fetch failed:", error);
    }
  };

  fetchProfile();

}, [user, navigate]);


  const handleSaveProfile = async () => {

  try {

    await updateProfile({
      full_name: profile.name,
      phone: profile.phone,
    });

    alert("Profile updated successfully");

  } catch (error) {

    console.error(error);

    alert("Failed to update profile");
  }
};

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  if (!user) {
    return null;
  }


  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white border rounded-3xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <User size={40} className="text-blue-600" />
            </div>

            <div className="flex-1">
  <h2 className="text-2xl font-semibold">
    {profile.name}
  </h2>

  <p className="text-gray-500">
    {profile.email}
  </p>
</div>

<button
  onClick={() => {
    logout();
    navigate("/");
  }}
  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
>
  <LogOut size={18} />
  Logout
</button>
          </div>
        </div>

        {/* Edit Profile */}
        <div className="bg-white border rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            Edit Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border rounded-xl p-3"
            />

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
              className="border rounded-xl p-3"
            />

            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border rounded-xl p-3"
            />
          </div>

          <button
  onClick={handleSaveProfile}
  className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl"
>
  Save Changes
</button>
        </div>

        {/* Change Password */}
        <div className="bg-white border rounded-3xl p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={20} />
            <h2 className="text-2xl font-semibold">
              Change Password
            </h2>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full border rounded-xl p-3"
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-xl p-3"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl">
            Update Password
          </button>
        </div>

        {/* My Reports */}
        <div className="bg-white border rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            My Reports
          </h2>

          <div className="space-y-3">
            <div className="border rounded-xl p-4">
              Lost Item - iPhone 14 Pro
            </div>

            <div className="border rounded-xl p-4">
              Found Item - Black Wallet
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 rounded-3xl p-8">
          <div className="flex items-center gap-2 mb-4">
            <Trash2 className="text-red-600" />
            <h2 className="text-2xl font-semibold text-red-600">
              Danger Zone
            </h2>
          </div>

          <p className="text-gray-600 mb-6">
            Permanently delete your account and all
            associated data.
          </p>

          <button className="bg-red-600 text-white px-6 py-3 rounded-xl">
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
}