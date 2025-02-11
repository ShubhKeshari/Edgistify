import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Package, AlertCircle, ArrowRight } from "lucide-react";
import CartItem from "./CartItem";
import { getCart } from "../../services/cart.service";
import { createOrder } from "../../services/order.service";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch cart");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const handleCheckout = async () => {
    if (!shippingAddress) {
      toast.error("Please enter a shipping address");
      return;
    }

    try {
      await createOrder({
        items: cart.items,
        totalPrice: cart.total,
        shippingAddress,
      });
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchCart}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="flex items-center justify-center px-4 pt-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Start Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-4">
          <ShoppingCart className="w-6 h-6 text-white mr-3" />
          <h2 className="text-2xl font-bold text-white">My Cart</h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            {cart.items.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                onUpdate={fetchCart}
              />
            ))}
          </div>

          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Address
              </label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter your complete shipping address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                rows="3"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-gray-800">₹{cart.total}</p>
                <p className="text-sm text-gray-600">Including all taxes</p>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                <Package className="w-5 h-5 mr-2" />
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;