import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimation';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fade-in">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </ScrollAnimation>

        <div className="space-y-8">
          <ScrollAnimation animation="slide-in-left">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Information We Collect</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p>We collect information that you provide directly to us, including:</p>
                <ul>
                  <li>Email address for newsletter subscriptions</li>
                  <li>Wallet addresses for airdrop participation</li>
                  <li>Usage data and interaction with our platform</li>
                </ul>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-in-right">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How We Use Your Information</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p>We use the collected information for:</p>
                <ul>
                  <li>Providing airdrop opportunities and updates</li>
                  <li>Sending newsletters and important announcements</li>
                  <li>Improving our services and user experience</li>
                  <li>Analyzing platform usage and trends</li>
                </ul>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-in-left">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Data Protection</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p>We implement security measures to protect your information:</p>
                <ul>
                  <li>Encryption of sensitive data</li>
                  <li>Regular security audits</li>
                  <li>Secure data storage practices</li>
                  <li>Limited access to personal information</li>
                </ul>
              </div>
            </section>
          </ScrollAnimation>
        </div>

        <ScrollAnimation animation="fade-in">
          <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Last updated: May 19, 2025</p>
            <p>Contact us at privacy@airdrops-hunter.cloud for any privacy-related questions.</p>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default Privacy;