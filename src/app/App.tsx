import React, { useEffect } from 'react';
import Header from '../shared/ui/Header';
import FeedbackForm from '../features/feedback/create-feedback/FeedbackForm';
import FeedbackList from '../widgets/feedback/FeedbackList';
import EditFeedbackModal from '../features/feedback/edit-feedback/EditFeedbackModal';
import { useThemeStore } from '../store/themeStore';
import { useFeedbackStore } from '../entities/feedback';
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
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FeedbackForm />
          </div>
          <div className="lg:col-span-8">
            <FeedbackList />
          </div>
        </div>
      </main>
      <EditFeedbackModal />
    </div>
  );
}

export default App;