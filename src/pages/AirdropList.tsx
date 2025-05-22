import React, { useEffect, useState } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import LoadingScreen from '../components/LoadingScreen';

interface Airdrop {
  id: string;
  title: string;
  description: string;
  short_description: string;
  status: string;
  start_date: string;
  end_date: string;
  reward_amount: number;
  reward_token: string;
  image_url: string;
  category: string;
  is_featured: boolean;
}

const AirdropList = () => {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchAirdrops();
  }, []);

  const fetchAirdrops = async () => {
    try {
      const { data, error } = await supabase
        .from('airdrops')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAirdrops(data || []);
    } catch (error) {
      console.error('Error fetching airdrops:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAirdrops = airdrops
    .filter(airdrop => 
      airdrop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      airdrop.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(airdrop => 
      selectedCategory === 'all' || airdrop.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
      } else if (sortBy === 'ending') {
        return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
      } else {
        return b.reward_amount - a.reward_amount;
      }
    });

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Active Airdrops</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Discover and participate in the latest crypto airdrops</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search airdrops..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="defi">DeFi</option>
              <option value="nft">NFT</option>
              <option value="gaming">Gaming</option>
              <option value="dao">DAO</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={20} className="text-gray-400" />
            <select
              className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="ending">Ending Soon</option>
              <option value="reward">Highest Reward</option>
            </select>
          </div>
        </div>

        {/* Airdrop Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAirdrops.map((airdrop) => (
            <div
              key={airdrop.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={airdrop.image_url || 'https://via.placeholder.com/400x200'}
                  alt={airdrop.title}
                  className="w-full h-full object-cover"
                />
                {airdrop.is_featured && (
                  <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded text-sm">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {airdrop.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {airdrop.short_description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Ends: {format(new Date(airdrop.end_date), 'MMM dd, yyyy')}
                  </div>
                  <div className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    {airdrop.reward_amount} {airdrop.reward_token}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirdropList;