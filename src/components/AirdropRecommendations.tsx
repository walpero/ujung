import React from 'react';
import { Gift, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Airdrop {
  id: string;
  title: string;
  short_description: string;
  reward_amount: number;
  reward_token: string;
  end_date: string;
  image_url: string;
}

interface AirdropRecommendationsProps {
  airdrops: Airdrop[];
}

const AirdropRecommendations: React.FC<AirdropRecommendationsProps> = ({ airdrops }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recommended Airdrops</h2>
        </div>
        <Link
          to="/airdrops"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center"
        >
          View All
          <TrendingUp className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {airdrops.map((airdrop) => (
          <div
            key={airdrop.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative h-40 mb-4">
              <img
                src={airdrop.image_url}
                alt={airdrop.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded text-sm flex items-center">
                <Gift className="h-4 w-4 mr-1" />
                {airdrop.reward_amount} {airdrop.reward_token}
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {airdrop.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {airdrop.short_description}
            </p>
            <Link
              to={`/airdrops/${airdrop.id}`}
              className="block w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirdropRecommendations;