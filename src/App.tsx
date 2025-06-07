import React, { useEffect } from 'react';
import Header from './shared/ui/Header';
import FeedbackForm from './features/feedback/FeedbackForm';
import FeedbackList from './widgets/feedback/FeedbackList';
import EditFeedbackModal from './features/feedback/EditFeedbackModal';
import { useThemeStore } from './store/themeStore';
import { useFeedbackStore } from './entities/feedback';
import './App.css';

function App() {
  const { theme } = useThemeStore();
  const { applyFiltersAndSort, calculateStats } = useFeedbackStore();

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Force re-render of all components
    const event = new Event('themeChange');
    document.dispatchEvent(event);
  }, [theme]);

  useEffect(() => {
    // Load and apply filters on initial render
    calculateStats();
    applyFiltersAndSort();
  }, [applyFiltersAndSort, calculateStats]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900' 
        : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'
    }`}>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <FeedbackForm />
          </div>
          <div className="lg:col-span-2">
            <FeedbackList />
          </div>
        </div>
      </main>
      <EditFeedbackModal />
    </div>
  );
}

export default App;