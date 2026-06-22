import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { getAccessToken, removeTokens } from "../utils/tokenServices";

function Navbar() {
  const navigate = useNavigate();
  const token = getAccessToken();

  const handleLogout = () => {
    removeTokens();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Job Portal"
            className="w-20 h-20 object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-10 text-xl font-semibold">
          <Link to="/" className="hover:text-gray-300 transition">
            Home
          </Link>

          <Link to="/jobs" className="hover:text-gray-300 transition">
            Jobs
          </Link>

          {token && (
            <>
              <Link
                to="/applications"
                className="hover:text-gray-300 transition"
              >
                Applications
              </Link>

              <Link
                to="/profile"
                className="hover:text-gray-300 transition"
              >
                Profile
              </Link>
            </>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hover:text-gray-300 transition cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;