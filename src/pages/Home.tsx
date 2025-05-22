import React from 'react';
import { ArrowRight, Gift, Timer, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
                <span className="block">Discover the Best</span>
                <span className="block text-indigo-600 dark:text-indigo-400">Crypto Airdrops</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Stay ahead of the curve with our curated list of legitimate crypto airdrops. Never miss an opportunity to earn free tokens.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    to="/airdrops"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Browse Airdrops
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <ScrollAnimation animation="slide-in-left">
              <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
                <Gift className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Curated Airdrops</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300 text-center">
                  Hand-picked and verified airdrops to ensure you only participate in legitimate opportunities.
                </p>
              </div>
            </ScrollAnimation>

            {/* Feature 2 */}
            <ScrollAnimation animation="fade-in">
              <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
                <Timer className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Real-time Updates</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300 text-center">
                  Stay informed with live countdown timers and instant notifications for new airdrops.
                </p>
              </div>
            </ScrollAnimation>

            {/* Feature 3 */}
            <ScrollAnimation animation="slide-in-right">
              <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
                <Trophy className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Step-by-Step Guides</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300 text-center">
                  Detailed instructions and requirements to help you successfully claim your rewards.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-indigo-600 dark:bg-indigo-800">
        <ScrollAnimation>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Never Miss an Airdrop
              </h2>
              <p className="mt-4 text-lg text-indigo-100">
                Subscribe to our newsletter and get notified about new airdrops instantly.
              </p>
              <form className="mt-8 sm:flex sm:justify-center">
                <div className="min-w-0 flex-1 sm:max-w-lg">
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                  />
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    className="block w-full px-4 py-3 rounded-md border border-transparent text-base font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-8"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ScrollAnimation>
      </section>
    </div>
  );
};

export default Home;