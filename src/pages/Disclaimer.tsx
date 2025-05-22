import React from 'react';
import { AlertTriangle, Info, Shield } from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimation';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fade-in">
          <div className="text-center mb-12">
            <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Disclaimer</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Please read this disclaimer carefully before using our platform
            </p>
          </div>
        </ScrollAnimation>

        <div className="space-y-8">
          <ScrollAnimation animation="slide-in-left">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <Info className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">General Information</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300">
                  The information provided on Airdrops Hunter is for general informational purposes only. While we strive 
                  to keep the information up to date and correct, we make no representations or warranties of any kind, 
                  express or implied, about the completeness, accuracy, reliability, suitability, or availability with 
                  respect to the website or the information, products, services, or related graphics contained on the website 
                  for any purpose.
                </p>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-in-right">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Risk Warning</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Cryptocurrency airdrops involve substantial risk and may not be suitable for everyone. Before participating 
                  in any airdrop:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Conduct your own research</li>
                  <li>Never share your private keys or seed phrases</li>
                  <li>Be aware of potential scams and fraudulent activities</li>
                  <li>Understand that past performance is not indicative of future results</li>
                  <li>Only participate with funds you can afford to lose</li>
                </ul>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-in-left">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-amber-500 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">No Financial Advice</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300">
                  The content on this website is for informational purposes only and should not be construed as financial, 
                  investment, tax, or legal advice. We recommend consulting with a professional advisor before making any 
                  financial decisions. Airdrops Hunter is not responsible for any losses incurred as a result of participating 
                  in airdrops listed on our platform.
                </p>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in">
            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Last updated: May 19, 2025</p>
              <p>By using our platform, you acknowledge that you have read and understood this disclaimer.</p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;