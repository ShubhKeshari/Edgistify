// src/services/order.service.js
import api from './api';

export const createOrder = async (orderData) => {
  const response = await api.post('/orders/create-order', orderData);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/orders/get-orders');
  return response.data;
};