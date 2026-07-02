'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import toast from 'react-hot-toast';

type PaymentMethod = 'UPI' | 'GOOGLE_PAY' | 'PHONE_PE' | 'PAYTM' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'NET_BANKING' | null;

export default function Checkout() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    fetchOrderData();
  }, []);

  useEffect(() => {
    if (paymentInitiated && order) {
      generateQR();
    }
  }, [paymentInitiated, order]);

  const generateQR = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(`razorpay:${order.id}`);
      setQrDataUrl(dataUrl);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  const fetchOrderData = async () => {
    try {
      const response = await fetch('/api/checkout/summary');
      const data = await response.json();
      setOrder(data.order);
    } catch (error) {
      console.error('Failed to fetch order:', error);
      toast.error('Failed to load checkout data');
      router.push('/cart');
    } finally {
      setLoading(false);
    }
  };

  const initializePayment = async () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setProcessing(true);
    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          amount: order.total,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPaymentInitiated(true);
        // For Razorpay, open payment modal
        if (window.Razorpay) {
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.total * 100,
            currency: 'INR',
            name: 'ZenCraft Network',
            description: 'Store Purchase',
            order_id: data.razorpayOrderId,
            handler: (response: any) => {
              toast.success('Payment successful!');
              router.push(`/order-confirmation/${order.id}`);
            },
            prefill: {
              name: data.minecraftUsername,
            },
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      } else {
        toast.error('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred during payment');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-20">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-purple"></div>
        </div>
      </Container>
    );
  }

  const paymentMethods = [
    { id: 'UPI', label: 'UPI', icon: '📱' },
    { id: 'GOOGLE_PAY', label: 'Google Pay', icon: '🔵' },
    { id: 'PHONE_PE', label: 'PhonePe', icon: '💜' },
    { id: 'PAYTM', label: 'Paytm', icon: '🔷' },
    { id: 'CREDIT_CARD', label: 'Credit Card', icon: '💳' },
    { id: 'DEBIT_CARD', label: 'Debit Card', icon: '💳' },
    { id: 'NET_BANKING', label: 'Net Banking', icon: '🏦' },
  ];

  return (
    <Container className="py-20">
      <SectionTitle title="Checkout" subtitle="Complete your purchase" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Order Summary */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-dark-secondary border border-accent-purple/20 rounded-lg p-8 mb-6">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6 pb-6 border-b border-accent-purple/20">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax (18%)</span>
                <span>₹{order.tax.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-accent-emerald">
                  <span>Discount</span>
                  <span>-₹{order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold bg-accent-purple/10 p-4 rounded mt-4">
                <span>Total</span>
                <span className="text-accent-cyan">₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Method Selection */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="bg-dark-secondary border border-accent-purple/20 rounded-lg p-8">
            <h3 className="text-xl font-bold mb-6">Select Payment Method</h3>

            <div className="space-y-3 mb-8">
              {paymentMethods.map((method) => (
                <motion.button
                  key={method.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                    paymentMethod === method.id
                      ? 'border-accent-purple bg-accent-purple/10'
                      : 'border-accent-purple/20 hover:border-accent-purple/50'
                  }`}
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="font-semibold">{method.label}</span>
                  {paymentMethod === method.id && <span className="ml-auto text-accent-cyan">✓</span>}
                </motion.button>
              ))}
            </div>

            {paymentInitiated && paymentMethod && qrDataUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-lg p-6 mb-6 text-center"
              >
                <p className="text-accent-emerald font-semibold mb-4">Payment Initiated</p>
                <img src={qrDataUrl} alt="Payment QR Code" className="mx-auto" style={{ width: '200px', height: '200px' }} />
                <p className="text-sm text-gray-400 mt-4">Scan this QR code to complete payment</p>
              </motion.div>
            )}

            <button
              onClick={initializePayment}
              disabled={!paymentMethod || processing}
              className="w-full bg-gradient-accent px-6 py-3 rounded-lg font-semibold hover:shadow-glow-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Processing...' : 'Pay Now'}
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              Your payment is secure and processed by Razorpay
            </p>
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
