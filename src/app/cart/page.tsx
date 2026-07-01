'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setCartItems(data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await fetch(`/api/cart/${itemId}`, { method: 'DELETE' });
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }
    try {
      await fetch(`/api/cart/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      setCartItems(
        cartItems.map((item) => (item.id === itemId ? { ...item, quantity } : item))
      );
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const applyCoupon = async () => {
    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, total: subtotal }),
      });
      const data = await response.json();
      if (data.valid) {
        setDiscount(data.discount);
        toast.success('Coupon applied successfully!');
      } else {
        toast.error(data.message || 'Invalid coupon code');
      }
    } catch (error) {
      toast.error('Failed to apply coupon');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax - discount;

  if (loading) {
    return (
      <Container className="py-20">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-purple"></div>
        </div>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container className="py-20">
        <SectionTitle title="Shopping Cart" subtitle="Your cart is empty" />
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-8">Add some items to your cart to get started</p>
          <Link
            href="/store"
            className="inline-block bg-gradient-accent px-8 py-3 rounded-lg font-semibold hover:shadow-glow-purple transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-20">
      <SectionTitle title="Shopping Cart" subtitle={`${cartItems.length} item(s)`} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-dark-secondary border border-accent-purple/20 rounded-lg p-6 flex items-center justify-between hover:border-accent-purple/50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-400 text-sm">₹{item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-accent-purple/30 rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-accent-purple/20"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 border-l border-r border-accent-purple/30">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-accent-purple/20"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-400 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-dark-secondary border border-accent-purple/20 rounded-lg p-6 h-fit"
        >
          <h3 className="text-xl font-bold mb-6">Order Summary</h3>

          <div className="space-y-4 border-b border-accent-purple/20 pb-6 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tax (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-accent-emerald">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Coupon Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 bg-dark border border-accent-purple/30 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-purple"
              />
              <button
                onClick={applyCoupon}
                className="bg-accent-purple hover:bg-accent-purple/80 px-4 py-2 rounded font-semibold transition-colors"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="bg-accent-purple/10 border border-accent-purple/30 rounded p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-bold text-accent-cyan">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/checkout')}
            className="w-full bg-gradient-accent px-6 py-3 rounded-lg font-semibold hover:shadow-glow-purple transition-all mb-3"
          >
            Proceed to Checkout
          </button>
          <Link
            href="/store"
            className="block text-center text-accent-purple hover:text-accent-cyan transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </Container>
  );
}
