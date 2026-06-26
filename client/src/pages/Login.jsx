import { useState } from "react";
import { Link } from "react-router-dom";
import {
Search,
Mail,
Lock,
User,
Eye,
EyeOff,
ArrowLeft,
} from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser, registerUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";


export default function Login() {
const [activeTab, setActiveTab] = useState("signin");

const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();

const { login } = useContext(AuthContext);

const [signInData, setSignInData] = useState({
  email: "",
  password: "",
});

const [signUpData, setSignUpData] = useState({
  full_name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const handleSignInChange = (e) => {
  setSignInData({
    ...signInData,
    [e.target.name]: e.target.value,
  });
};

const handleSignUpChange = (e) => {
  setSignUpData({
    ...signUpData,
    [e.target.name]: e.target.value,
  });
};

const handleSignIn = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const response = await loginUser(signInData);

    login(response.user, response.token);

    if (response.user.role === "admin") {
  navigate("/admin");
} else {
  navigate("/");
}
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

const handleSignUp = async (e) => {
  e.preventDefault();

  if (
    signUpData.password !==
    signUpData.confirmPassword
  ) {
    setError("Passwords do not match");
    return;
  }

  try {
    setLoading(true);
    setError("");

    await registerUser({
      full_name: signUpData.full_name,
      email: signUpData.email,
      password: signUpData.password,
    });

    setSignUpData({
  full_name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

    alert("Registration successful");
    

    setActiveTab("signin");
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Registration failed"
    );
  } finally {
    setLoading(false);
  }
};

return ( <div className="min-h-screen bg-gray-50">
{/* Header */} <header className="bg-white border-b border-gray-200"> <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"> <div className="flex items-center gap-4"> <Link
           to="/"
           className="text-gray-600 hover:text-gray-900"
         > <ArrowLeft size={20} /> </Link>

        <Link to="/" className="flex items-center gap-2">
          <Search className="w-6 h-6 text-blue-600" />
          <span className="text-2xl font-medium text-gray-900">
            Find Back
          </span>
        </Link>
      </div>

      <Link
        to="/"
        className="text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Back to Home
      </Link>
    </div>
  </header>

  {/* Main */}
  <div className="flex justify-center items-center py-16 px-4">
    <div className="w-full max-w-md">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-3">
          Welcome to Find Back
        </h1>

        <p className="text-gray-500">
          Sign in to report and track your items
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
        {/* Tabs */}
        <div className="bg-gray-100 rounded-full p-1 flex mb-8">
          <button
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${
              activeTab === "signin"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${
              activeTab === "signup"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
  <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
    {error}
  </div>
)}

        {/* SIGN IN */}
        {activeTab === "signin" && (
          <>
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">
              Sign In
            </h2>

            <p className="text-gray-500 mb-6">
              Enter your credentials to access your account
            </p>

            <form className="space-y-4" onSubmit={handleSignIn}>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
  type="email"
  name="email"
  value={signInData.email}
  onChange={handleSignInChange}
                    placeholder="your.email@example.com"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-blue-600 text-sm"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={signInData.password}
                    onChange={handleSignInChange}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-sm text-gray-600">
                  Remember me
                </span>
              </div>

              <button
  type="submit"
  disabled={loading}
  className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50"
>
  {loading ? "Signing In..." : "Sign In"}
</button>
            </form>
          </>
        )}

        {/* SIGN UP */}
        {activeTab === "signup" && (
          <>
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">
              Create Account
            </h2>

            <p className="text-gray-500 mb-6">
              Sign up to start reporting items
            </p>

            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="full_name"
                    value={signUpData.full_name}
                    onChange={handleSignUpChange}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    placeholder="your.email@example.com"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    placeholder="Create a password"
                    className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    placeholder="Confirm your password"
                    className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />

                <p className="text-sm text-gray-600">
                  I agree to the Terms of Service and Privacy
                  Policy
                </p>
              </div>

              <button
  type="submit"
  disabled={loading}
  className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50"
>
  {loading ? "Creating Account..." : "Create Account"}
</button>
            </form>
          </>
        )}
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        By signing in, you agree to our commitment to privacy
        and security of your data.
      </p>
    </div>
  </div>
</div>

);
}
