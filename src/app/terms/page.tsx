'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 mb-8 flex-grow max-w-[984px]">
        <div className="py-8 md:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Terms of Service</h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 text-white/90">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                Welcome to InstaGrab. By accessing or using our service, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p className="mb-4">
                InstaGrab provides tools to download publicly accessible Instagram content for personal use only. Our service accesses only public content that is freely accessible through Instagram&apos;s public interfaces.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">3. User Responsibilities</h2>
              <p className="mb-4">
                You are responsible for your use of the service and any content you download. You agree not to use our service:
              </p>
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>For any illegal purpose or to violate any laws or regulations</li>
                <li>To infringe upon or violate the intellectual property rights or privacy rights of others</li>
                <li>To download private or copyrighted content without proper authorization</li>
                <li>To distribute, sell, or commercially exploit downloaded content</li>
                <li>To download content with the intent to harass, abuse, or harm others</li>
                <li>To attempt to interfere with or disrupt the service or servers connected to the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">4. Intellectual Property</h2>
              <p className="mb-4">
                InstaGrab does not claim ownership of any content downloaded through our service. All images and videos belong to their respective owners. We respect copyright laws and expect our users to do the same.
              </p>
              <p className="mb-4">
                If you believe that your copyrighted work has been accessed or downloaded in a way that constitutes copyright infringement, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">5. Limitations of Liability</h2>
              <p className="mb-4">
                InstaGrab provides this service on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties, expressed or implied, and hereby disclaim all warranties including, but not limited to, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
              </p>
              <p className="mb-4">
                In no event shall InstaGrab be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">6. Modifications to Service</h2>
              <p className="mb-4">
                InstaGrab reserves the right to modify or discontinue, temporarily or permanently, the service with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">7. Changes to Terms</h2>
              <p className="mb-4">
                InstaGrab reserves the right to revise these terms of service at any time without notice. By using this service, you agree to be bound by the current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Contact</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default TermsPage; 