import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShoppingCart, Menu, X, LogOut, AlertCircle } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // You would get this from your cart context
  const cartItemsCount = 5; // Replace with actual cart items count

  // Close menu when clicking outside
  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (showLogoutModal && !e.target.closest('[data-modal-container]')) {
        setShowLogoutModal(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [showLogoutModal]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
    setShowLogoutModal(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/products", label: "Products" },
    ...(user
      ? [
          {
            path: "/cart",
            label: "Cart",
            // icon: (
            //   <div className="relative inline-block">
            //     <ShoppingCart className="w-5 h-5 inline-block" />
            //     {cartItemsCount > 0 && (
            //       <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            //         {cartItemsCount}
            //       </span>
            //     )}
            //   </div>
            // ),
          },
          { path: "/orders", label: "Orders" },
        ]
      : [
          { path: "/login", label: "Login" },
          { path: "/register", label: "Register" },
        ]),
  ];

  const NavLink = ({ path, label, icon }) => (
    <Link
      to={path}
      className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2
        ${
          isActivePath(path)
            ? "text-blue-600 bg-blue-50"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
      onClick={() => setIsMenuOpen(false)}
    >
      {icon}
      {label}
    </Link>
  );

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              BookBazaar
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <NavLink key={link.path} {...link} />
              ))}
              {user && (
                <button
                  onClick={handleLogoutClick}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                >
                  Logout
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <NavLink key={link.path} {...link} />
                ))}
                {user && (
                  <button
                    onClick={handleLogoutClick}
                    className="px-4 py-2 text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    Logout
                  </button>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Centered Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            data-modal-container
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md animate-[fadeIn_0.2s_ease-in-out]"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <h2 className="text-2xl font-semibold text-gray-900">
                  Confirm Logout
                </h2>
              </div>
              <p className="text-gray-600 text-lg mb-6">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-6 py-2.5 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="px-6 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 flex items-center gap-2 font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;