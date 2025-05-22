import React from 'react';
import { Users, Gift, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
          {trend !== undefined && (
            <p className={`text-sm mt-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              <TrendingUp className={`h-4 w-4 mr-1 ${trend < 0 ? 'transform rotate-180' : ''}`} />
              {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('-600', '-100')} dark:bg-opacity-10`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

interface DashboardStatsProps {
  totalSubscribers: number;
  activeAirdrops: number;
  completionRate: number;
  upcomingAirdrops: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalSubscribers,
  activeAirdrops,
  completionRate,
  upcomingAirdrops
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Subscribers"
        value={totalSubscribers.toLocaleString()}
        icon={<Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        trend={12}
        color="border-blue-600"
      />
      <StatsCard
        title="Active Airdrops"
        value={activeAirdrops}
        icon={<Gift className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
        trend={8}
        color="border-purple-600"
      />
      <StatsCard
        title="Completion Rate"
        value={`${completionRate}%`}
        icon={<TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />}
        trend={5}
        color="border-green-600"
      />
      <StatsCard
        title="Upcoming Airdrops"
        value={upcomingAirdrops}
        icon={<Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
        color="border-amber-600"
      />
    </div>
  );
};

export default DashboardStats;