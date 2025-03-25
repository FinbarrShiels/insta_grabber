'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 mb-8 flex-grow max-w-[900px]">
        <div className="py-8 md:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Privacy Policy</h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 text-white/90">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="mb-4">
                At InstaGrab, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
              </p>
              <p className="mb-4">
                By using InstaGrab, you consent to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <p className="mb-4">
                <strong>Usage Data:</strong> We may collect information on how the service is accessed and used. This data may include your computer&apos;s Internet Protocol address (IP address), browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
              </p>
              <p className="mb-4">
                <strong>Instagram Content:</strong> When you use our service to download content from Instagram, we temporarily process the URL you provide and the associated content. We do not store the content you download through our service on our servers after your session ends.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>Provide and maintain our service</li>
                <li>Improve, personalize, and expand our service</li>
                <li>Monitor the usage of our service</li>
                <li>Detect, prevent, and address technical issues</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">4. Data Retention</h2>
              <p className="mb-4">
                InstaGrab does not store the content you download through our service. Any Instagram content is processed temporarily and is not stored on our servers after your session ends.
              </p>
              <p className="mb-4">
                We retain usage logs and analytics data for a limited period to help us improve our service. This data is anonymized and does not contain personally identifiable information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">5. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p className="mb-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">6. Third-Party Services</h2>
              <p className="mb-4">
                We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, perform service-related services, or assist us in analyzing how our service is used.
              </p>
              <p className="mb-4">
                These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">7. Security</h2>
              <p className="mb-4">
                The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">8. Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have certain rights regarding your personal data, such as:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>The right to access the personal data we have about you</li>
                <li>The right to request correction or deletion of your personal data</li>
                <li>The right to restrict or object to our processing of your personal data</li>
                <li>The right to data portability</li>
              </ul>
              <p className="mb-4">
                Please note that since we do not store personal content or create user accounts, most of these rights may not apply to our specific service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">9. Children&apos;s Privacy</h2>
              <p className="mb-4">
                Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">10. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default PrivacyPage; 