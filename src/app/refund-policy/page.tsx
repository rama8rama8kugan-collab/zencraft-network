'use client';

import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';

export default function RefundPolicy() {
  return (
    <Container className="py-20">
      <SectionTitle title="Refund Policy" subtitle="We value your satisfaction" />

      <div className="max-w-3xl mx-auto mt-12 text-gray-300 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-accent-purple mb-4">1. Refund Eligibility</h2>
          <p>
            We offer a 7-day refund policy for all purchases made from the ZenCraft Network store. To be eligible
            for a refund, your purchase must meet the following criteria:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>The purchase was made within the last 7 days</li>
            <li>The item(s) purchased have not been used or redeemed in-game</li>
            <li>You have not already received a refund for this item</li>
            <li>You have a valid proof of purchase (order number)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-accent-purple mb-4">2. Non-Refundable Items</h2>
          <p>The following items are NOT eligible for refund:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>Items that have been used or redeemed in-game</li>
            <li>Temporary ranks that have expired</li>
            <li>Cosmetics that have been applied to your account</li>
            <li>Keys, Crates, and Coins that have been used</li>
            <li>Bundles with mixed used and unused items</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-accent-purple mb-4">3. How to Request a Refund</h2>
          <p>To request a refund, please follow these steps:</p>
          <ol className="list-decimal list-inside space-y-2 mt-3">
            <li>Visit our website and log in to your account</li>
            <li>Go to your Purchase History in your dashboard</li>
            <li>Find the item you wish to refund and click "Request Refund"</li>
            <li>Fill out the refund request form with your reason</li>
            <li>Submit the request</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-accent-purple mb-4">4. Refund Processing</h2>
          <p>
            Once your refund request is submitted, our team will review it within 2-3 business days. If approved,
            the refund will be processed back to your original payment method within 5-7 business days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-accent-purple mb-4">5. Refund Status</h2>
          <p>
            You can track your refund status in your account dashboard under "Refunds". You will also receive
            email notifications for any updates on your refund request.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-accent-purple mb-4">6. Exceptions</h2>
          <p>
            We reserve the right to deny refunds for suspicious activity, fraud, or abuse of the refund policy.
            Repeated refund requests may result in account suspension.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-accent-purple mb-4">7. Contact Support</h2>
          <p>
            If you have any questions about our refund policy, please contact our support team at{' '}
            <a href="mailto:support@zencraft.in" className="text-accent-cyan hover:text-accent-purple">
              support@zencraft.in
            </a>
          </p>
        </section>
      </div>
    </Container>
  );
}
