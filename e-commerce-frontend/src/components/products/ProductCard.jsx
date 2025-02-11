import React, { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { addToCart } from '../../services/cart.service';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      await addToCart(product._id, 1);
      toast.success('Product added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add product to cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Container with reduced height */}
      <div className="relative w-full h-52 overflow-hidden bg-gray-100">
        <img
          src={product.image || '/api/placeholder/300/300'}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Quick view button on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="p-3 bg-white/90 rounded-full hover:bg-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            title="View Details"
          >
            <Eye className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Spacer to push price and button to bottom */}
        <div className="flex-1"></div>
        
        {/* Price and Add to Cart - now at bottom */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;