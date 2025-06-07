import React, { useState } from 'react';
import { ThumbsUp, Edit, Trash2 } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useThemeChange } from '../../shared/hooks/useThemeChange';
import { Feedback } from '../../entities/feedback/types/feedback';

interface FeedbackItemProps {
  feedback: Feedback;
  onVote: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ 
  feedback,
  onVote,
  onEdit,
  onDelete
}) => {
  const { theme } = useThemeStore();
  useThemeChange();
  const [hasVoted, setHasVoted] = useState(false);
  
  const isDark = theme === 'dark';
  const { id, title, description, category, priority, status, votes, createdAt, tags } = feedback;

  const handleVote = () => {
    setHasVoted(!hasVoted);
    onVote(id);
  };

  const handleEdit = () => {
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const formatDate = (date: Date | string) => {
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj);
  };

  const categoryEmoji = {
    'UI': '🎨',
    'Performance': '⚡',
    'Feature': '🚀',
    'Bug': '💻'
  }[category] || '💡';

  const statusEmoji = {
    'Open': '📋',
    'In Progress': '⚙️',
    'Completed': '✅',
    'Rejected': '❌'
  }[status] || '📋';

  const priorityEmoji = {
    'Critical': '🔴',
    'High': '🟠',
    'Medium': '🟡',
    'Low': '🟢'
  }[priority] || '⚪';

  return (
    <div className={`glass-effect rounded-2xl p-6 fade-in ${
      isDark ? 'bg-gray-800/50' : ''
    }`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${
              isDark ? 'bg-gray-700/50' : 'bg-white/50'
            }`}>
              <span className="text-2xl">{categoryEmoji}</span>
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h3>
              <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-lg text-base font-medium ${
              isDark ? 'bg-gray-700/50 text-white' : 'bg-white/50 text-gray-700'
            }`}>
              {statusEmoji} {status}
            </span>
            <span className={`px-4 py-2 rounded-lg text-base font-medium ${
              isDark ? 'bg-gray-700/50 text-white' : 'bg-white/50 text-gray-700'
            }`}>
              {priorityEmoji} {priority}
            </span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-lg text-base font-medium ${
                  isDark ? 'bg-gray-700/50 text-white' : 'bg-white/50 text-gray-700'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={handleVote}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium ${
                isDark 
                  ? 'bg-gray-700/50 text-white hover:bg-gray-600/50' 
                  : 'bg-white/50 text-gray-700 hover:bg-gray-50/50'
              }`}
            >
              <ThumbsUp className={`w-5 h-5 ${hasVoted ? 'text-purple-500' : ''}`} />
              <span>{votes} votes</span>
            </button>
            <span className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {formatDate(createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium ${
                isDark 
                  ? 'bg-gray-700/50 text-white hover:bg-gray-600/50' 
                  : 'bg-white/50 text-gray-700 hover:bg-gray-50/50'
              }`}
            >
              <Edit className="w-5 h-5" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium ${
                isDark 
                  ? 'bg-gray-700/50 text-white hover:bg-gray-600/50' 
                  : 'bg-white/50 text-gray-700 hover:bg-gray-50/50'
              }`}
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default FeedbackItem; 