import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { updateCartItem, removeFromCart } from '../../services/cart.service';

const CartItem = ({ item, onUpdate }) => {
  const handleQuantityChange = async (newQuantity) => {
    try {
      if (newQuantity < 1) {
        await removeFromCart(item.product._id);
      } else {
        await updateCartItem(item.product._id, newQuantity);
      }
      onUpdate();
    } catch (error) {
      console.error('Failed to update cart:', error);
      alert('Failed to update cart');
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(item.product._id);
      onUpdate();
    } catch (error) {
      console.error('Failed to remove item:', error);
      alert('Failed to remove item');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-200 gap-4 sm:gap-6 group hover:bg-gray-50 transition-colors p-4 rounded-lg">
      {/* Product Image */}
      <div className="relative">
        <img
          src={item.product.image || '/api/placeholder/100/100'}
          alt={item.product.name}
          className="w-24 h-24 object-cover rounded-lg shadow-sm"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 rounded-lg transition-opacity" />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Unit Price: ₹{item.product.price.toLocaleString()}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-2 hover:bg-gray-50 text-gray-600 hover:text-gray-800 transition-colors rounded-l-lg border-r border-gray-200"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="px-6 py-2 text-gray-800 font-medium">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-2 hover:bg-gray-50 text-gray-600 hover:text-gray-800 transition-colors rounded-r-lg border-l border-gray-200"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Total Price and Remove Button */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            ₹{(item.product.price * item.quantity).toLocaleString()}
          </p>
          {/* <p className="text-sm text-gray-500">Total</p> */}
        </div>
        <button
          onClick={handleRemove}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;