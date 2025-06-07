import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Award, Clock, AlertTriangle } from 'lucide-react';
import { useFeedbackStore } from '../../entities/feedback';
import { useThemeStore } from '../../store/themeStore';

const FeedbackStats: React.FC = () => {
  const { stats } = useFeedbackStore();
  const { theme } = useThemeStore();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleThemeChange = () => {
      setForceUpdate(prev => prev + 1);
    };

    document.addEventListener('themeChange', handleThemeChange);
    return () => {
      document.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  const categoryIcons = {
    UI: '🎨',
    Performance: '⚡',
    Feature: '🚀',
    Bug: '🐛',
  };

  const statusIcons = {
    Open: '📋',
    'In Progress': '⚙️',
    Completed: '✅',
    Rejected: '❌',
  };

  const priorityIcons = {
    Critical: '🔴',
    High: '🟠',
    Medium: '🟡',
    Low: '🟢',
  };

  return (
    <div className={`glass-effect rounded-2xl p-6 fade-in ${
      isDark ? 'bg-gray-800/50' : ''
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Feedback Analytics
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className={`rounded-xl p-4 text-center ${
          isDark ? 'bg-gray-700/50' : 'bg-white/50'
        }`}>
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {stats.total}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Feedback
          </div>
        </div>

        <div className={`rounded-xl p-4 text-center ${
          isDark ? 'bg-gray-700/50' : 'bg-white/50'
        }`}>
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {stats.totalVotes}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Votes
          </div>
        </div>

        <div className={`rounded-xl p-4 text-center ${
          isDark ? 'bg-gray-700/50' : 'bg-white/50'
        }`}>
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {stats.averageVotes.toFixed(1)}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Avg. Votes
          </div>
        </div>

        <div className={`rounded-xl p-4 text-center ${
          isDark ? 'bg-gray-700/50' : 'bg-white/50'
        }`}>
          <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {stats.byPriority['Critical'] || 0}
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Critical Issues
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <div>
          <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Category Breakdown
          </h4>
          <div className="space-y-2">
            {Object.entries(stats.byCategory).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-20 rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </div>
                  <span className={`text-sm font-semibold w-6 text-right ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Breakdown */}
        <div>
          <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Status Breakdown
          </h4>
          <div className="space-y-2">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{statusIcons[status as keyof typeof statusIcons]}</span>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-20 rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </div>
                  <span className={`text-sm font-semibold w-6 text-right ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div>
          <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Priority Breakdown
          </h4>
          <div className="space-y-2">
            {Object.entries(stats.byPriority).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{priorityIcons[priority as keyof typeof priorityIcons]}</span>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {priority}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-20 rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </div>
                  <span className={`text-sm font-semibold w-6 text-right ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackStats;