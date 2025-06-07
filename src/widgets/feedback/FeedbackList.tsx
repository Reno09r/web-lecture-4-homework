import React from 'react';
import { MessageSquare, Clock } from 'lucide-react';
import { useFeedbackStore, selectFilteredFeedbacks } from '../../entities/feedback';
import { useThemeStore } from '../../store/themeStore';
import { FeedbackItem } from '../../features/feedback';
import { FeedbackStats, FeedbackControls } from './';
import { useThemeChange } from '../../shared/hooks/useThemeChange';

const FeedbackList: React.FC = () => {
  const filteredAndSortedFeedbacks = useFeedbackStore(selectFilteredFeedbacks);
  const { theme } = useThemeStore();
  useThemeChange();
  
  const isDark = theme === 'dark';

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
        <div className={`text-center py-12 rounded-2xl ${
          isDark ? 'bg-gray-800/50' : 'bg-white/50'
        }`}>
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className={`text-lg font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            No feedback yet
          </h3>
          <p className={`${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Be the first to share your thoughts!
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