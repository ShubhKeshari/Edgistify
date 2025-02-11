// src/components/cart/Cart.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { getCart } from "../../services/cart.service";
import { createOrder } from "../../services/order.service";
import { useAuth } from "../../context/AuthContext";

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
      alert("Please enter a shipping address");
      return;
    }

    try {
      await createOrder({
        items: cart.items,
        totalPrice: cart.total,
        shippingAddress,
      });
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Cart</h2>

      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6">
            {cart.items.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                onUpdate={fetchCart}
              />
            ))}

            <div className="mt-6 pt-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Shipping Address: 
                </label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter Shipping Adress"
                  className="mt-1 block w-full border border-blue-500 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm p-2"
                  rows="3"
                  required
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">Total: ₹{cart.total}</p>
                  <p className="text-sm text-gray-600">Including VAT</p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
