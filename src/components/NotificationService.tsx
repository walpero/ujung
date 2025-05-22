import React, { useEffect, useState } from 'react';
import { Bell, BellOff, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationService: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = () => {
    if ('Notification' in window) {
      setIsSubscribed(Notification.permission === 'granted');
    }
  };

  const subscribeToNotifications = async () => {
    if (!('Notification' in window)) {
      setError('Your browser does not support notifications');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setIsSubscribed(true);
        
        if (!('serviceWorker' in navigator)) {
          setError('Service Worker is not supported in your browser');
          return;
        }

        const registration = await navigator.serviceWorker.register('/sw.js');
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY
        });
        
        await supabase
          .from('push_subscriptions')
          .insert([{ subscription: JSON.stringify(subscription) }]);

        new Notification('Notifications Enabled', {
          body: 'You will now receive notifications about new airdrops!'
        });
      }
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      setError('Failed to subscribe to notifications');
    }
  };

  const subscribeToEmails = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error: subError } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (subError) throw subError;

      setEmail('');
      setIsOpen(false);
      setError(null);

      if (Notification.permission === 'granted') {
        new Notification('Subscription Successful', {
          body: 'You will now receive email updates about new airdrops!'
        });
      }
    } catch (error) {
      console.error('Error subscribing to emails:', error);
      setError('Failed to subscribe to email updates');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
      >
        Stay Updated
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
          >
            {error && (
              <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <button
                onClick={subscribeToNotifications}
                disabled={isSubscribed}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubscribed ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
                {isSubscribed ? 'Notifications Enabled' : 'Enable Notifications'}
              </button>

              <form onSubmit={subscribeToEmails} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Subscribe to Email Updates
                </button>
              </form>

              <a
                href="/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 text-center text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                RSS Feed
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationService;