import React, { useState } from 'react';
import { Trash2, Calendar, User, ChevronUp, ChevronDown, Edit, Clock } from 'lucide-react';
import { useFeedbackStore } from '../../entities/feedback';
import { useThemeStore } from '../../store/themeStore';
import { Feedback } from '../../entities/feedback/types/feedback';
import { useThemeChange } from '../../shared/hooks/useThemeChange';

interface FeedbackItemProps {
  feedback: Feedback;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  
  const { deleteFeedback, voteFeedback, openEditModal } = useFeedbackStore();
  const { theme } = useThemeStore();
  useThemeChange();
  
  const isDark = theme === 'dark';

  const handleDelete = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    
    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      deleteFeedback(feedback.id);
    } catch (error) {
      console.error('Error deleting feedback:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleVote = async (increment: boolean) => {
    if (isVoting) return;
    
    setIsVoting(true);
    
    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 200));
      voteFeedback(feedback.id, increment);
    } catch (error) {
      console.error('Error voting feedback:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) {
        console.error('Invalid date:', date);
        return 'Invalid date';
      }
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(dateObj);
    } catch (error) {
      console.error('Error formatting date:', error, 'Date:', date);
      return 'Invalid date';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'UI':
        return 'from-purple-400 to-pink-400';
      case 'Performance':
        return 'from-orange-400 to-red-400';
      case 'Feature':
        return 'from-green-400 to-teal-400';
      case 'Bug':
        return 'from-red-400 to-pink-400';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'UI':
        return '🎨';
      case 'Performance':
        return '⚡';
      case 'Feature':
        return '🚀';
      case 'Bug':
        return '💻';
      default:
        return '💡';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColorDark = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-900/50 text-red-300 border-red-700';
      case 'High':
        return 'bg-orange-900/50 text-orange-300 border-orange-700';
      case 'Medium':
        return 'bg-yellow-900/50 text-yellow-300 border-yellow-700';
      case 'Low':
        return 'bg-green-900/50 text-green-300 border-green-700';
      default:
        return 'bg-gray-700 text-gray-300 border-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColorDark = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-900/50 text-blue-300 border-blue-700';
      case 'In Progress':
        return 'bg-purple-900/50 text-purple-300 border-purple-700';
      case 'Completed':
        return 'bg-green-900/50 text-green-300 border-green-700';
      case 'Rejected':
        return 'bg-red-900/50 text-red-300 border-red-700';
      default:
        return 'bg-gray-700 text-gray-300 border-gray-600';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'Open':
        return '📋';
      case 'In Progress':
        return '⚙️';
      case 'Completed':
        return '✅';
      case 'Rejected':
        return '❌';
      default:
        return '📋';
    }
  };

  const getPriorityEmoji = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return '🔴';
      case 'High':
        return '🟠';
      case 'Medium':
        return '🟡';
      case 'Low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <div className={`glass-effect rounded-2xl p-6 feedback-card fade-in ${
      isDark ? 'bg-gray-800/50' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className={`p-2 bg-gradient-to-r ${getCategoryColor(feedback.category)} rounded-lg`}>
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {feedback.title}
            </h3>
            <div className={`flex items-center gap-2 text-sm mt-1 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <Calendar className="w-3 h-3" />
              <span>{formatDate(feedback.createdAt)}</span>
              {(() => {
                const createdAt = new Date(feedback.createdAt);
                const updatedAt = new Date(feedback.updatedAt);
                if (!isNaN(createdAt.getTime()) && !isNaN(updatedAt.getTime()) && 
                    updatedAt.getTime() !== createdAt.getTime()) {
                  return (
                    <>
                      <Clock className="w-3 h-3 ml-2" />
                      <span>Updated {formatDate(updatedAt)}</span>
                    </>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Voting Controls */}
          <div className={`flex flex-col items-center rounded-lg p-2 shadow-sm ${
            isDark ? 'bg-gray-700' : 'bg-white'
          }`}>
            <button
              onClick={() => handleVote(true)}
              disabled={isVoting}
              className={`p-1 rounded transition-all duration-200 disabled:opacity-50 ${
                isDark 
                  ? 'text-gray-400 hover:text-green-400 hover:bg-green-900/20' 
                  : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
              }`}
              title="Upvote"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <span className={`text-sm font-semibold px-1 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {feedback.votes}
            </span>
            <button
              onClick={() => handleVote(false)}
              disabled={isVoting || feedback.votes === 0}
              className={`p-1 rounded transition-all duration-200 disabled:opacity-50 ${
                isDark 
                  ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              title="Downvote"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => openEditModal(feedback)}
            className={`p-2 rounded-lg delete-button transition-colors ${
              isDark 
                ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-900/20' 
                : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
            }`}
            title="Edit feedback"
          >
            <Edit className="w-4 h-4" />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`p-2 rounded-lg delete-button disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
              isDark 
                ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            title="Delete feedback"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <p className={`leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {feedback.description}
      </p>

      {/* Tags */}
      {feedback.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {feedback.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                isDark 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className={`flex items-center justify-between pt-4 border-t ${
        isDark ? 'border-gray-700' : 'border-gray-100'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
            isDark ? getCategoryColor(feedback.category).replace('from-', 'bg-').replace('to-', '').replace('-400', '-900/50').replace('-500', '-900/50') + ' text-white border-transparent' : 'bg-white border-gray-200 text-gray-700'
          }`}>
            <span className="mr-1">{getCategoryEmoji(feedback.category)}</span>
            {feedback.category}
          </span>
          
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
            isDark ? getPriorityColorDark(feedback.priority) : getPriorityColor(feedback.priority)
          }`}>
            <span className="mr-1">{getPriorityEmoji(feedback.priority)}</span>
            {feedback.priority}
          </span>
          
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
            isDark ? getStatusColorDark(feedback.status) : getStatusColor(feedback.status)
          }`}>
            <span className="mr-1">{getStatusEmoji(feedback.status)}</span>
            {feedback.status}
          </span>
        </div>
        
        <div className={`flex items-center gap-2 text-xs ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <span>ID: {feedback.id.slice(-8)}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackItem;