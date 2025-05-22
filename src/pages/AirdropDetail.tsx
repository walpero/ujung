import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Link as LinkIcon, Twitter, MessageCircle, Globe, Gift, Clock, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import LoadingScreen from '../components/LoadingScreen';
import ScrollAnimation from '../components/ScrollAnimation';

interface Airdrop {
  id: string;
  title: string;
  description: string;
  short_description: string;
  status: 'upcoming' | 'live' | 'ended';
  start_date: string;
  end_date: string;
  reward_amount: number;
  reward_token: string;
  image_url: string;
  website_url: string;
  twitter_url: string;
  telegram_url: string;
  discord_url: string;
  requirements: any;
  category: string;
  is_featured: boolean;
}

const AirdropDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [airdrop, setAirdrop] = useState<Airdrop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAirdropDetails();
  }, [id]);

  const fetchAirdropDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('airdrops')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setAirdrop(data);
    } catch (error) {
      console.error('Error fetching airdrop details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;
  if (!airdrop) return <div>Airdrop not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimation animation="fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64 sm:h-96">
              <img
                src={airdrop.image_url || 'https://via.placeholder.com/1200x400'}
                alt={airdrop.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white text-center px-4">
                  {airdrop.title}
                </h1>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <ScrollAnimation animation="slide-in-left" className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  About this Airdrop
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {airdrop.description}
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {Array.isArray(airdrop.requirements) ? (
                    airdrop.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                        <ChevronRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                        {req}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-600 dark:text-gray-300">No specific requirements listed</li>
                  )}
                </ul>
              </div>
            </div>
          </ScrollAnimation>

          {/* Sidebar */}
          <ScrollAnimation animation="slide-in-right" className="space-y-6">
            {/* Status Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Airdrop Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Gift className="h-5 w-5 mr-2" />
                    Reward
                  </div>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {airdrop.reward_amount} {airdrop.reward_token}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="h-5 w-5 mr-2" />
                    Status
                  </div>
                  <span 
                    className={
                      airdrop.status === 'live'
                        ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm'
                        : airdrop.status === 'upcoming'
                        ? 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm'
                        : 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm'
                    }
                  >
                    {airdrop.status.charAt(0).toUpperCase() + airdrop.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="h-5 w-5 mr-2" />
                    End Date
                  </div>
                  <span className="text-gray-900 dark:text-gray-100">
                    {format(new Date(airdrop.end_date), 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
            </div>

            {/* Links Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Important Links
              </h3>
              <div className="space-y-3">
                {airdrop.website_url && (
                  <a
                    href={airdrop.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <Globe className="h-5 w-5 mr-2" />
                    Official Website
                  </a>
                )}
                {airdrop.twitter_url && (
                  <a
                    href={airdrop.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <Twitter className="h-5 w-5 mr-2" />
                    Twitter
                  </a>
                )}
                {airdrop.telegram_url && (
                  <a
                    href={airdrop.telegram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Telegram
                  </a>
                )}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default AirdropDetail;