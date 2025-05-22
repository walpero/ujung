import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Users, Gift, ChevronDown, Save, X, Settings, Activity, Shield, Eye, EyeOff, Search, Filter, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import LoadingScreen from '../components/LoadingScreen';
import DashboardStats from '../components/AdminDashboard/DashboardStats';
import ActivityChart from '../components/AdminDashboard/ActivityChart';
import { motion } from 'framer-motion';

interface Airdrop {
  id: string;
  title: string;
  description: string;
  short_description: string;
  status: 'upcoming' | 'live' | 'ended';
  category: string;
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
  is_featured: boolean;
  created_at: string;
}

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

interface AdminLog {
  id: string;
  action: string;
  entity_type: string;
  details: any;
  created_at: string;
}

interface AdminSetting {
  id: string;
  key: string;
  value: any;
  description: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('airdrops');
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [adminLogs, setAdminLogs] = useState<AdminLog[]>([]);
  const [settings, setSettings] = useState<AdminSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAirdrop, setEditingAirdrop] = useState<Airdrop | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showPassword, setShowPassword] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [dashboardStats, setDashboardStats] = useState({
    totalSubscribers: 0,
    activeAirdrops: 0,
    completionRate: 0,
    upcomingAirdrops: 0
  });

  const [activityData, setActivityData] = useState([
    { date: '2025-01', airdrops: 4, subscribers: 120 },
    { date: '2025-02', airdrops: 6, subscribers: 250 },
    { date: '2025-03', airdrops: 8, subscribers: 380 },
    { date: '2025-04', airdrops: 12, subscribers: 520 },
    { date: '2025-05', airdrops: 15, subscribers: 680 }
  ]);

  const [formData, setFormData] = useState<Partial<Airdrop>>({
    title: '',
    description: '',
    short_description: '',
    status: 'upcoming',
    category: 'defi',
    start_date: '',
    end_date: '',
    reward_amount: 0,
    reward_token: '',
    image_url: '',
    website_url: '',
    twitter_url: '',
    telegram_url: '',
    discord_url: '',
    requirements: {},
    is_featured: false
  });

  useEffect(() => {
    fetchData();
  }, [activeTab, currentPage, itemsPerPage, filterStatus, searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats
      const { data: subscriberCount } = await supabase
        .from('newsletter_subscribers')
        .select('id', { count: 'exact' });
        
      const { data: activeAirdropsCount } = await supabase
        .from('airdrops')
        .select('id', { count: 'exact' })
        .eq('status', 'live');
        
      const { data: upcomingAirdropsCount } = await supabase
        .from('airdrops')
        .select('id', { count: 'exact' })
        .eq('status', 'upcoming');
      
      setDashboardStats({
        totalSubscribers: subscriberCount || 0,
        activeAirdrops: activeAirdropsCount || 0,
        completionRate: 85, // Example static value, implement real calculation
        upcomingAirdrops: upcomingAirdropsCount || 0
      });

      let query;

      switch (activeTab) {
        case 'airdrops':
          // First get total count
          const countQuery = supabase
            .from('airdrops')
            .select('id', { count: 'exact' });

          if (filterStatus !== 'all') {
            countQuery.eq('status', filterStatus);
          }

          if (searchTerm) {
            countQuery.ilike('title', `%${searchTerm}%`);
          }

          const { count } = await countQuery;
          setTotalCount(count || 0);

          // Then get paginated data
          query = supabase
            .from('airdrops')
            .select('*')
            .order('created_at', { ascending: false });

          if (filterStatus !== 'all') {
            query = query.eq('status', filterStatus);
          }

          if (searchTerm) {
            query = query.ilike('title', `%${searchTerm}%`);
          }

          const { data: airdropData, error: airdropError } = await query
            .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

          if (airdropError) throw airdropError;
          setAirdrops(airdropData || []);
          break;

        case 'subscribers':
          const { count: subscriberCount } = await supabase
            .from('newsletter_subscribers')
            .select('id', { count: 'exact' });

          setTotalCount(subscriberCount || 0);

          const { data: subscriberData, error: subscriberError } = await supabase
            .from('newsletter_subscribers')
            .select('*')
            .order('created_at', { ascending: false })
            .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

          if (subscriberError) throw subscriberError;
          setSubscribers(subscriberData || []);
          break;

        case 'logs':
          const { count: logCount } = await supabase
            .from('admin_logs')
            .select('id', { count: 'exact' });

          setTotalCount(logCount || 0);

          const { data: logData, error: logError } = await supabase
            .from('admin_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

          if (logError) throw logError;
          setAdminLogs(logData || []);
          break;

        case 'settings':
          const { data: settingData, error: settingError } = await supabase
            .from('admin_settings')
            .select('*')
            .order('key', { ascending: true });

          if (settingError) throw settingError;
          setSettings(settingData || []);
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const logAdminAction = async (action: string, entityType: string, details: any) => {
    try {
      const { error } = await supabase
        .from('admin_logs')
        .insert([{ action, entity_type: entityType, details }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAirdrop) {
        const { error } = await supabase
          .from('airdrops')
          .update(formData)
          .eq('id', editingAirdrop.id);
        
        if (error) throw error;
        
        await logAdminAction(
          'update',
          'airdrop',
          { airdrop_id: editingAirdrop.id, changes: formData }
        );
      } else {
        const { error } = await supabase
          .from('airdrops')
          .insert([formData]);
        
        if (error) throw error;
        
        await logAdminAction(
          'create',
          'airdrop',
          { airdrop_data: formData }
        );
      }
      
      setShowAddModal(false);
      setEditingAirdrop(null);
      setFormData({
        title: '',
        description: '',
        short_description: '',
        status: 'upcoming',
        category: 'defi',
        start_date: '',
        end_date: '',
        reward_amount: 0,
        reward_token: '',
        image_url: '',
        website_url: '',
        twitter_url: '',
        telegram_url: '',
        discord_url: '',
        requirements: {},
        is_featured: false
      });
      fetchData();
    } catch (error) {
      console.error('Error saving airdrop:', error);
    }
  };

  const handleDelete = async (id: string, type: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const { error } = await supabase
          .from(type)
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        await logAdminAction(
          'delete',
          type,
          { item_id: id }
        );
        
        fetchData();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleUpdateSetting = async (settingId: string, value: any) => {
    try {
      const { error } = await supabase
        .from('admin_settings')
        .update({ value })
        .eq('id', settingId);

      if (error) throw error;

      await logAdminAction(
        'update',
        'setting',
        { setting_id: settingId, new_value: value }
      );

      fetchData();
    } catch (error) {
      console.error('Error updating setting:', error);
    }
  };

  const renderTabContent = () => {
    if (loading) return <LoadingScreen />;

    switch (activeTab) {
      case 'airdrops':
        return (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {airdrops.map((airdrop) => (
                  <tr key={airdrop.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {airdrop.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        airdrop.status === 'live'
                          ? 'bg-green-100 text-green-800'
                          : airdrop.status === 'upcoming'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {airdrop.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {airdrop.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {format(new Date(airdrop.created_at), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => {
                          setEditingAirdrop(airdrop);
                          setFormData(airdrop);
                          setShowAddModal(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(airdrop.id, 'airdrops')}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'subscribers':
        return (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Subscribed At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {format(new Date(subscriber.created_at), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleDelete(subscriber.id, 'newsletter_subscribers')}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'logs':
        return (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Entity Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {adminLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {log.entity_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {format(new Date(log.created_at), 'MMM dd, yyyy HH:mm:ss')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      <pre className="whitespace-pre-wrap">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            {settings.map((setting) => (
              <div
                key={setting.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {setting.key}
                </h3>
                <p className="text-gray-500 dark:text-gray-300 mb-4">
                  {setting.description}
                </p>
                <div className="flex items-center space-x-4">
                  <input
                    type={setting.key.includes('password') ? (showPassword ? 'text' : 'password') : 'text'}
                    value={JSON.stringify(setting.value)}
                    onChange={(e) => {
                      try {
                        const newValue = JSON.parse(e.target.value);
                        handleUpdateSetting(setting.id, newValue);
                      } catch (error) {
                        console.error('Invalid JSON value');
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                  {setting.key.includes('password') && (
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage your platform's content and settings
          </p>
        </motion.div>

        {/* Dashboard Stats */}
        <div className="mb-8">
          <DashboardStats {...dashboardStats} />
        </div>

        {/* Activity Chart */}
        <div className="mb-8">
          <ActivityChart data={activityData} />
        </div>

        {/* Tabs */}
        <div className="mb-6 flex space-x-4">
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'airdrops'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('airdrops')}
          >
            <Gift className="w-5 h-5 mr-2" />
            Airdrops
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'subscribers'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('subscribers')}
          >
            <Users className="w-5 h-5 mr-2" />
            Subscribers
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'logs'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('logs')}
          >
            <Activity className="w-5 h-5 mr-2" />
            Activity Logs
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'settings'
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>
              
              {activeTab === 'airdrops' && (
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="live">Live</option>
                  <option value="ended">Ended</option>
                </select>
              )}
              
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={fetchData}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              
              {activeTab === 'airdrops' && (
                <button
                  onClick={() => {
                    setEditingAirdrop(null);
                    setFormData({
                      title: '',
                      description: '',
                      short_description: '',
                      status: 'upcoming',
                      category: 'defi',
                      start_date: '',
                      end_date: '',
                      reward_amount: 0,
                      reward_token: '',
                      image_url: '',
                      website_url: '',
                      twitter_url: '',
                      telegram_url: '',
                      discord_url: '',
                      requirements: {},
                      is_featured: false
                    });
                    setShowAddModal(true);
                  }}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Airdrop
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {renderTabContent()}
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing page {currentPage} of {totalPages}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingAirdrop ? 'Edit Airdrop' : 'Add New Airdrop'}
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3  py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Short Description
                  </label>
                  <textarea
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    rows={2}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      required
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="live">Live</option>
                      <option value="ended">Ended</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      required
                    >
                      <option value="defi">DeFi</option>
                      <option value="nft">NFT</option>
                      <option value="gaming">Gaming</option>
                      <option value="dao">DAO</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Date
                    </label>
                    <input
                      type="datetime-local"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date
                    </label>
                    <input
                      type="datetime-local"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Reward Amount
                    </label>
                    <input
                      type="number"
                      name="reward_amount"
                      value={formData.reward_amount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Reward Token
                    </label>
                    <input
                      type="text"
                      name="reward_token"
                      value={formData.reward_token}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Website URL
                    </label>
                    <input
                      type="url"
                      name="website_url"
                      value={formData.website_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Twitter URL
                    </label>
                    <input
                      type="url"
                      name="twitter_url"
                      value={formData.twitter_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Telegram URL
                    </label>
                    <input
                      type="url"
                      name="telegram_url"
                      value={formData.telegram_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Discord URL
                    </label>
                    <input
                      type="url"
                      name="discord_url"
                      value={formData.discord_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Feature this airdrop
                  </label>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {editingAirdrop ? 'Update' : 'Create'} Airdrop
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;