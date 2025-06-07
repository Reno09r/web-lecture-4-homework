import React, { useState, useEffect } from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { useFeedbackStore } from '@/entities/feedback';
import { useThemeStore } from '@/store/themeStore';
import { SortOption, FilterOption, StatusFilter, PriorityFilter } from '@/entities/feedback/types/feedback';
import { SearchBar } from '@/features/feedback';

const FeedbackControls: React.FC = () => {
  const { 
    sortBy, 
    filterBy, 
    statusFilter, 
    priorityFilter, 
    setSortBy, 
    setFilterBy, 
    setStatusFilter, 
    setPriorityFilter 
  } = useFeedbackStore();
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

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-voted', label: 'Most Voted' },
    { value: 'least-voted', label: 'Least Voted' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' },
  ];

  const filterOptions: { value: FilterOption; label: string; emoji: string }[] = [
    { value: 'all', label: 'All Categories', emoji: '📋' },
    { value: 'Feature', label: 'Features', emoji: '🚀' },
    { value: 'UI', label: 'UI/UX', emoji: '🎨' },
    { value: 'Performance', label: 'Performance', emoji: '⚡' },
    { value: 'Bug', label: 'Bugs', emoji: '💻' },
  ];

  const statusOptions: { value: StatusFilter; label: string; emoji: string }[] = [
    { value: 'all', label: 'All Status', emoji: '📋' },
    { value: 'Open', label: 'Open', emoji: '📋' },
    { value: 'In Progress', label: 'In Progress', emoji: '⚙️' },
    { value: 'Completed', label: 'Completed', emoji: '✅' },
    { value: 'Rejected', label: 'Rejected', emoji: '❌' },
  ];

  const priorityOptions: { value: PriorityFilter; label: string; emoji: string }[] = [
    { value: 'all', label: 'All Priority', emoji: '⚪' },
    { value: 'Critical', label: 'Critical', emoji: '🔴' },
    { value: 'High', label: 'High', emoji: '🟠' },
    { value: 'Medium', label: 'Medium', emoji: '🟡' },
    { value: 'Low', label: 'Low', emoji: '🟢' },
  ];

  return (
    <div className={`glass-effect rounded-2xl p-6 fade-in ${
      isDark ? 'bg-gray-800/50' : ''
    }`}>
      <div className="space-y-6">
        {/* Search Bar */}
        <SearchBar />
        
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center flex-1">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Filter className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Filters:
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {/* Category Filter */}
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as FilterOption)}
                className={`px-4 py-2 rounded-lg text-base font-medium border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white/70 border-gray-200 text-gray-700'
                }`}
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.emoji} {option.label}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className={`px-4 py-2 rounded-lg text-base font-medium border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white/70 border-gray-200 text-gray-700'
                }`}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.emoji} {option.label}
                  </option>
                ))}
              </select>

              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
                className={`px-4 py-2 rounded-lg text-base font-medium border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white/70 border-gray-200 text-gray-700'
                }`}
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.emoji} {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <ArrowUpDown className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              <span className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Sort:
              </span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className={`px-4 py-2 rounded-lg text-base font-medium border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white/70 border-gray-200 text-gray-700'
              }`}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackControls;