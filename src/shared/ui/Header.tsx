import React from 'react';
import { MessageSquare, Lightbulb } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <header className={`glass-effect border-b ${
      isDark ? 'border-gray-700/50' : 'border-white/20'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Product Feedback Board
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Share your ideas and help us improve
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <div className={`mt-4 flex items-center gap-2 text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <Lightbulb className="w-4 h-4" />
          <span>Every great product starts with feedback from users like you</span>
        </div>
      </div>
    </header>
  );
};

export default Header;