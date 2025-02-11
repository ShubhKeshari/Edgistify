// src/components/orders/OrderItem.js
import React from 'react';

const OrderItem = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  console.log("Shubham this is order", order);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-600">Order ID: {order._id}</p>
          <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.orderStatus)}`}>
            {order.orderStatus}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.paymentStatus)}`}>
            {order.paymentStatus}
          </span>
        </div>
      </div>

      <div className="border-t border-b py-4 my-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <img
                src={item.product.image || '/api/placeholder/50/50'}
                alt={item.product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="ml-4">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium">₹{item.product.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex justify-between mb-2">
          <p className="font-medium">Total Amount:</p>
          <p className="font-bold">₹{order.totalPrice}</p>
        </div>
        <div className="mt-4">
          <p className="font-medium">Shipping Address:</p>
          <p className="text-gray-600">{order.shippingAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;