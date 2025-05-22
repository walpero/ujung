import React from 'react';
import { Rocket } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Rocket className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About AirdropHunter</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Your trusted companion in the world of crypto airdrops</p>
        </div>

        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="leading-relaxed">
              We're dedicated to helping crypto enthusiasts discover and participate in legitimate airdrops. 
              Our platform simplifies the process of finding, verifying, and tracking airdrop opportunities 
              while ensuring the highest standards of security and transparency.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What We Offer</h2>
            <ul className="list-disc list-inside space-y-3">
              <li>Curated list of verified airdrops</li>
              <li>Real-time updates and notifications</li>
              <li>Detailed guides and requirements</li>
              <li>Community-driven insights</li>
              <li>Secure participation methods</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p>We provide clear, honest information about every airdrop opportunity.</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Security</h3>
                <p>Your safety is our priority. We thoroughly verify all listings.</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Community</h3>
                <p>We build and nurture a knowledgeable crypto community.</p>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p>We constantly evolve to meet the dynamic crypto landscape.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;