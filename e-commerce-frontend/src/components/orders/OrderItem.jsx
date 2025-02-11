import React from 'react';
import { Package, Truck, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const OrderItem = ({ order }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock,
        };
      case 'Processing':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: Package,
        };
      case 'Shipped':
        return {
          color: 'bg-purple-100 text-purple-800',
          icon: Truck,
        };
      case 'Delivered':
        return {
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: AlertTriangle,
        };
    }
  };

  const orderStatusConfig = getStatusConfig(order.orderStatus);
  const paymentStatusConfig = getStatusConfig(order.paymentStatus);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Order ID: <span className="font-mono">{order._id}</span></p>
            <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${orderStatusConfig.color}`}>
              <orderStatusConfig.icon className="h-4 w-4" />
              {order.orderStatus}
            </span>
            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${paymentStatusConfig.color}`}>
              <paymentStatusConfig.icon className="h-4 w-4" />
              {order.paymentStatus}
            </span>
          </div>
        </div>

        <div className="border-t border-b py-4 my-4">
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 last:pb-0">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <img
                      src={item.product.image || '/api/placeholder/64/64'}
                      alt={item.product.name}
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.product.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium text-gray-900">₹{(item.product.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900">Total Amount</p>
            <p className="text-lg font-bold text-gray-900">₹{order.totalPrice.toLocaleString()}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-900 mb-2">Shipping Address</p>
            <p className="text-gray-600 text-sm">{order.shippingAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;