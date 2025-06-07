import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { Feedback, FeedbackStats, SortOption, FilterOption, StatusFilter, PriorityFilter, FeedbackFormData } from '../types/feedback';

interface FeedbackState {
  // Data
  feedbacks: Feedback[];
  
  // UI State
  sortBy: SortOption;
  filterBy: FilterOption;
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  searchQuery: string;
  
  // Modal State
  isEditModalOpen: boolean;
  editingFeedback: Feedback | null;
  
  // Computed
  stats: FeedbackStats;
  filteredAndSortedFeedbacks: Feedback[];
  
  // Actions
  addFeedback: (feedback: FeedbackFormData) => void;
  updateFeedback: (id: string, updates: Partial<Feedback>) => void;
  deleteFeedback: (id: string) => void;
  voteFeedback: (id: string, increment: boolean) => void;
  
  // UI Actions
  setSortBy: (sort: SortOption) => void;
  setFilterBy: (filter: FilterOption) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setPriorityFilter: (filter: PriorityFilter) => void;
  setSearchQuery: (query: string) => void;
  
  // Modal Actions
  openEditModal: (feedback: Feedback) => void;
  closeEditModal: () => void;
  
  // Utility Actions
  calculateStats: () => void;
  applyFiltersAndSort: () => void;
}

const calculateStats = (feedbacks: Feedback[]): FeedbackStats => {
  const total = feedbacks.length;
  
  const byCategory = feedbacks.reduce((acc, feedback) => {
    acc[feedback.category] = (acc[feedback.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byStatus = feedbacks.reduce((acc, feedback) => {
    acc[feedback.status] = (acc[feedback.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byPriority = feedbacks.reduce((acc, feedback) => {
    acc[feedback.priority] = (acc[feedback.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const totalVotes = feedbacks.reduce((sum, feedback) => sum + feedback.votes, 0);
  const averageVotes = total > 0 ? totalVotes / total : 0;

  return { total, byCategory, byStatus, byPriority, totalVotes, averageVotes };
};

const sortFeedbacks = (feedbacks: Feedback[], sortBy: SortOption): Feedback[] => {
  const sorted = [...feedbacks];
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    case 'oldest':
      return sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    case 'most-voted':
      return sorted.sort((a, b) => b.votes - a.votes);
    case 'least-voted':
      return sorted.sort((a, b) => a.votes - b.votes);
    case 'priority':
      const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
      return sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    case 'status':
      const statusOrder = { 'Open': 1, 'In Progress': 2, 'Completed': 3, 'Rejected': 4 };
      return sorted.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    default:
      return sorted;
  }
};

const filterFeedbacks = (
  feedbacks: Feedback[], 
  filterBy: FilterOption, 
  statusFilter: StatusFilter, 
  priorityFilter: PriorityFilter,
  searchQuery: string
): Feedback[] => {
  let filtered = feedbacks;
  
  // Category filter
  if (filterBy !== 'all') {
    filtered = filtered.filter(feedback => feedback.category === filterBy);
  }
  
  // Status filter
  if (statusFilter !== 'all') {
    filtered = filtered.filter(feedback => feedback.status === statusFilter);
  }
  
  // Priority filter
  if (priorityFilter !== 'all') {
    filtered = filtered.filter(feedback => feedback.priority === priorityFilter);
  }
  
  // Search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(feedback => 
      feedback.title.toLowerCase().includes(query) ||
      feedback.description.toLowerCase().includes(query) ||
      feedback.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  return filtered;
};

const initialFeedbacks: Feedback[] = [
  {
    id: 'demo-1',
    title: 'Dark Mode Support',
    description: 'It would be great to have a dark mode option for better user experience during night time usage. This could help reduce eye strain and provide a more modern look.',
    category: 'UI',
    priority: 'Medium',
    status: 'Open',
    votes: 12,
    tags: ['accessibility', 'ui', 'theme'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'demo-2',
    title: 'Mobile App Version',
    description: 'Consider developing a mobile application for iOS and Android to make the platform more accessible on the go. Push notifications for new updates would be valuable.',
    category: 'Feature',
    priority: 'High',
    status: 'In Progress',
    votes: 8,
    tags: ['mobile', 'ios', 'android', 'notifications'],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 'demo-3',
    title: 'Slow Loading Times',
    description: 'The application takes too long to load on slower connections. Consider implementing lazy loading and optimizing images.',
    category: 'Performance',
    priority: 'Critical',
    status: 'Open',
    votes: 15,
    tags: ['performance', 'optimization', 'loading'],
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: 'demo-4',
    title: 'Export Data Feature',
    description: 'Users should be able to export their feedback data in various formats like CSV, JSON, or PDF for reporting purposes.',
    category: 'Feature',
    priority: 'Low',
    status: 'Completed',
    votes: 6,
    tags: ['export', 'data', 'reporting'],
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
];

export const useFeedbackStore = create<FeedbackState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        feedbacks: initialFeedbacks,
        sortBy: 'newest',
        filterBy: 'all',
        statusFilter: 'all',
        priorityFilter: 'all',
        searchQuery: '',
        isEditModalOpen: false,
        editingFeedback: null,
        stats: calculateStats(initialFeedbacks),
        filteredAndSortedFeedbacks: sortFeedbacks(initialFeedbacks, 'newest'),

        // Actions
        addFeedback: (feedbackData: FeedbackFormData) => {
          const newFeedback: Feedback = {
            ...feedbackData,
            id: crypto.randomUUID(),
            votes: 0,
            status: 'Open',
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => {
            const updatedFeedbacks = [newFeedback, ...state.feedbacks];
            return {
              feedbacks: updatedFeedbacks,
              stats: calculateStats(updatedFeedbacks),
            };
          });
          
          get().applyFiltersAndSort();
        },

        updateFeedback: (id: string, updates: Partial<Feedback>) => {
          set((state) => {
            const updatedFeedbacks = state.feedbacks.map(feedback =>
              feedback.id === id
                ? { ...feedback, ...updates, updatedAt: new Date() }
                : feedback
            );
            return {
              feedbacks: updatedFeedbacks,
              stats: calculateStats(updatedFeedbacks),
            };
          });
          
          get().applyFiltersAndSort();
        },

        deleteFeedback: (id: string) => {
          set((state) => {
            const updatedFeedbacks = state.feedbacks.filter(feedback => feedback.id !== id);
            return {
              feedbacks: updatedFeedbacks,
              stats: calculateStats(updatedFeedbacks),
            };
          });
          
          get().applyFiltersAndSort();
        },

        voteFeedback: (id: string, increment: boolean) => {
          set((state) => {
            const updatedFeedbacks = state.feedbacks.map(feedback =>
              feedback.id === id
                ? {
                    ...feedback,
                    votes: Math.max(0, feedback.votes + (increment ? 1 : -1)),
                    updatedAt: new Date(),
                  }
                : feedback
            );
            return {
              feedbacks: updatedFeedbacks,
              stats: calculateStats(updatedFeedbacks),
            };
          });
          
          get().applyFiltersAndSort();
        },

        // UI Actions
        setSortBy: (sort: SortOption) => {
          set({ sortBy: sort });
          get().applyFiltersAndSort();
        },

        setFilterBy: (filter: FilterOption) => {
          set({ filterBy: filter });
          get().applyFiltersAndSort();
        },

        setStatusFilter: (filter: StatusFilter) => {
          set({ statusFilter: filter });
          get().applyFiltersAndSort();
        },

        setPriorityFilter: (filter: PriorityFilter) => {
          set({ priorityFilter: filter });
          get().applyFiltersAndSort();
        },

        setSearchQuery: (query: string) => {
          set({ searchQuery: query });
          get().applyFiltersAndSort();
        },

        // Modal Actions
        openEditModal: (feedback: Feedback) => {
          set({ isEditModalOpen: true, editingFeedback: feedback });
        },

        closeEditModal: () => {
          set({ isEditModalOpen: false, editingFeedback: null });
        },

        // Utility Actions
        calculateStats: () => {
          const state = get();
          set({ stats: calculateStats(state.feedbacks) });
        },

        applyFiltersAndSort: () => {
          const state = get();
          const filtered = filterFeedbacks(
            state.feedbacks,
            state.filterBy,
            state.statusFilter,
            state.priorityFilter,
            state.searchQuery
          );
          const sorted = sortFeedbacks(filtered, state.sortBy);
          set({ filteredAndSortedFeedbacks: sorted });
        },
      }),
      {
        name: 'feedback-storage',
        partialize: (state) => ({
          feedbacks: state.feedbacks,
          sortBy: state.sortBy,
          filterBy: state.filterBy,
          statusFilter: state.statusFilter,
          priorityFilter: state.priorityFilter,
        }),
      }
    ),
    { name: 'feedback-store' }
  )
);