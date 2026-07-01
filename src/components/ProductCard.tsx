'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const discountedPrice = product.originalPrice
    ? product.originalPrice - (product.originalPrice * product.discount) / 100
    : product.price;

  const addToCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (response.ok) {
        toast.success('Added to cart!');
      } else {
        toast.error('Failed to add to cart');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-dark-secondary border border-accent-purple/20 rounded-lg overflow-hidden hover:border-accent-purple/50 transition-colors group"
    >
      {product.image && (
        <div className="w-full h-40 relative bg-accent-purple/10 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
          />
          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
              -{product.discount}%
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{product.name}</h3>
        {product.description && <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>}

        <div className="mb-4">
          {product.discount > 0 ? (
            <>
              <p className="text-sm text-gray-500 line-through">₹{product.originalPrice?.toFixed(2)}</p>
              <p className="text-2xl font-bold text-accent-cyan">₹{discountedPrice.toFixed(2)}</p>
            </>
          ) : (
            <p className="text-2xl font-bold text-accent-cyan">₹{product.price.toFixed(2)}</p>
          )}
        </div>

        <button
          onClick={addToCart}
          className="w-full bg-gradient-accent px-4 py-2 rounded-lg font-semibold hover:shadow-glow-purple transition-all"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
