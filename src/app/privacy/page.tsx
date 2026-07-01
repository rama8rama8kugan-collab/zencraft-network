'use client';

import Container from '@/components/Container';
import SectionTitle from '@/components/SectionTitle';

export default function PrivacyPolicy() {
  return (
    <Container className="py-20">
      <SectionTitle title="Privacy Policy" subtitle="Your privacy matters to us" />

      <div className="max-w-3xl mx-auto mt-12 text-gray-300 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-accent-purple mb-4">1. Introduction</h2>
          <p>
            ZenCraft Network ("Company", "we", "us", or "our") operates the zencraft.in website (the
            "Service"). This page informs you of our policies regarding the collection, use, and disclosure of
            personal data when you use our Service and the choices you have associated with that data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-accent-purple mb-4">2. Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our
            Service to you.
          </p>
          <h3 className="text-xl font-bold text-accent-cyan mt-4 mb-2">Types of Data Collected:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or identify you ("Personal Data").
              This may include, but is not limited to: Email address, Minecraft username, First name and last
              name, Phone number, Cookies and Usage Data
            </li>
            <li>
              <strong>Usage Data:</strong> We may also collect information about how the Service is accessed and
              used ("Usage Data"). This may include information such as your computer's IP address, browser
              type, browser version, pages visited, time and date stamps, and other diagnostic data.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-accent-purple mb-4">3. Use of Data</h2>
          <p>ZenCraft Network uses the collected data for various purposes:</p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer care and support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-accent-purple mb-4">4. Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the
            Internet or method of electronic storage is 100% secure. While we strive to use commercially
            acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-accent-purple mb-4">5. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
            new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-accent-purple mb-4">6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mt-3">
            Email:{' '}
            <a href="mailto:privacy@zencraft.in" className="text-accent-cyan hover:text-accent-purple">
              privacy@zencraft.in
            </a>
          </p>
        </section>
      </div>
    </Container>
  );
}
