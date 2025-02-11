// src/components/cart/CartItem.js
import React from 'react';
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
    <div className="flex items-center py-4 border-b">
      <img
        src={item.product.image || '/api/placeholder/100/100'}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-medium text-gray-800">{item.product.name}</h3>
        <p className="text-gray-600">₹{item.product.price}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="px-2 py-1 border rounded-l"
        >
          -
        </button>
        <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="px-2 py-1 border rounded-r"
        >
          +
        </button>
      </div>
      <div className="ml-6">
        <p className="text-lg font-semibold">${item.product.price * item.quantity}</p>
      </div>
      <button
        onClick={handleRemove}
        className="ml-6 text-red-600 hover:text-red-800"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;