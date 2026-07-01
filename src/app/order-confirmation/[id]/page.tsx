'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';

export default function OrderConfirmation() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [params]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`);
      if (!response.ok) throw new Error('Order not found');
      const data = await response.json();
      setOrder(data.order);
    } catch (error) {
      toast.error('Failed to load order');
      router.push('/profile');
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = async () => {
    if (!order) return;

    const pdf = new jsPDF();
    pdf.setFontSize(20);
    pdf.text('ZenCraft Network - Invoice', 10, 10);

    pdf.setFontSize(12);
    pdf.text(`Order #: ${order.orderNumber}`, 10, 30);
    pdf.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 10, 40);
    pdf.text(`Status: ${order.status}`, 10, 50);

    let y = 70;
    pdf.setFontSize(10);
    pdf.text('Items:', 10, y);
    y += 10;

    order.items.forEach((item: any) => {
      pdf.text(`${item.product.name} x${item.quantity} - ₹${item.price}`, 10, y);
      y += 7;
    });

    y += 5;
    pdf.setFontSize(12);
    pdf.text(`Total: ₹${order.total.toFixed(2)}`, 10, y);

    pdf.save(`invoice-${order.orderNumber}.pdf`);
    toast.success('Invoice downloaded!');
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

  return (
    <Container className="py-20">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-accent-emerald mb-2">✓ Order Confirmed!</h1>
          <p className="text-gray-400">Thank you for your purchase. Your order has been received.</p>
        </div>

        <div className="bg-dark-secondary border border-accent-purple/20 rounded-lg p-8 mb-8">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">Order Number</p>
              <p className="text-xl font-bold text-accent-cyan">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Status</p>
              <span className="inline-block px-4 py-2 rounded bg-accent-emerald/20 text-accent-emerald font-semibold">
                {order.status}
              </span>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Order Date</p>
              <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Payment Method</p>
              <p className="font-semibold">{order.paymentMethod}</p>
            </div>
          </div>

          <div className="border-t border-accent-purple/20 pt-6">
            <h3 className="text-lg font-bold mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-accent-purple/20">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Subtotal</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Tax</span>
                <span>₹{order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-accent-cyan">
                <span>Total</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {order.invoiceUrl && (
          <div className="text-center mb-8">
            <QRCode value={order.invoiceUrl} size={200} className="mx-auto mb-4" />
            <p className="text-sm text-gray-400">Scan to view invoice online</p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={downloadInvoice}
            className="bg-accent-purple hover:bg-accent-purple/80 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Download Invoice
          </button>
          <a
            href="/store"
            className="border border-accent-purple/50 hover:border-accent-purple px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </motion.div>
    </Container>
  );
}
