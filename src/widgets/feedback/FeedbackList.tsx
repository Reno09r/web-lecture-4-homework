import React, { useState, useEffect } from 'react';
import { MessageSquare, Clock } from 'lucide-react';
import { useFeedbackStore } from '../../entities/feedback';
import { useThemeStore } from '../../store/themeStore';
import { FeedbackItem } from '../../features/feedback';
import { FeedbackStats, FeedbackControls } from './';

const FeedbackList: React.FC = () => {
  const { filteredAndSortedFeedbacks } = useFeedbackStore();
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              All Feedback ({filteredAndSortedFeedbacks.length})
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Community suggestions and ideas
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <FeedbackStats />

      {/* Controls */}
      <FeedbackControls />

      {/* Feedback List */}
      {filteredAndSortedFeedbacks.length === 0 ? (
        <div className={`glass-effect rounded-2xl p-12 text-center fade-in ${
          isDark ? 'bg-gray-800/50' : ''
        }`}>
          <div className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${
            isDark ? 'bg-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-200'
          }`}>
            <Clock className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            No feedback found
          </h3>
          <p className={`max-w-sm mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Try adjusting your filters or be the first to share your ideas!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedFeedbacks.map((feedback) => (
            <FeedbackItem key={feedback.id} feedback={feedback} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;