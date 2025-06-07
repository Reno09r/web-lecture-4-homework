import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useFeedbackStore } from '../../entities/feedback';
import { useThemeStore } from '../../store/themeStore';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useFeedbackStore();
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
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search feedback..."
        className={`w-full pl-10 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          isDark 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
            : 'bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500'
        }`}
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
            isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;