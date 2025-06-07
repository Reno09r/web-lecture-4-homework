import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Feedback, FeedbackStats, SortOption, FilterOption } from '@/entities/feedback/types/feedback';

interface FeedbackState {
  feedbacks: Feedback[];
  sortBy: SortOption;
  filterBy: FilterOption;
  stats: FeedbackStats;
}

type FeedbackAction =
  | { type: 'ADD_FEEDBACK'; payload: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt' | 'votes'> }
  | { type: 'DELETE_FEEDBACK'; payload: string }
  | { type: 'VOTE_FEEDBACK'; payload: { id: string; increment: boolean } }
  | { type: 'SET_SORT'; payload: SortOption }
  | { type: 'SET_FILTER'; payload: FilterOption };

interface FeedbackContextType extends FeedbackState {
  addFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt' | 'votes'>) => void;
  deleteFeedback: (id: string) => void;
  voteFeedback: (id: string, increment: boolean) => void;
  setSortBy: (sort: SortOption) => void;
  setFilterBy: (filter: FilterOption) => void;
  filteredAndSortedFeedbacks: Feedback[];
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

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
    default:
      return sorted;
  }
};

const filterFeedbacks = (feedbacks: Feedback[], filterBy: FilterOption): Feedback[] => {
  if (filterBy === 'all') return feedbacks;
  return feedbacks.filter(feedback => feedback.category === filterBy);
};

const feedbackReducer = (state: FeedbackState, action: FeedbackAction): FeedbackState => {
  switch (action.type) {
    case 'ADD_FEEDBACK': {
      const newFeedback: Feedback = {
        ...action.payload,
        id: crypto.randomUUID(),
        votes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedFeedbacks = [newFeedback, ...state.feedbacks];
      return {
        ...state,
        feedbacks: updatedFeedbacks,
        stats: calculateStats(updatedFeedbacks),
      };
    }
    
    case 'DELETE_FEEDBACK': {
      const updatedFeedbacks = state.feedbacks.filter(feedback => feedback.id !== action.payload);
      return {
        ...state,
        feedbacks: updatedFeedbacks,
        stats: calculateStats(updatedFeedbacks),
      };
    }
    
    case 'VOTE_FEEDBACK': {
      const updatedFeedbacks = state.feedbacks.map(feedback =>
        feedback.id === action.payload.id
          ? {
              ...feedback,
              votes: Math.max(0, feedback.votes + (action.payload.increment ? 1 : -1)),
              updatedAt: new Date(),
            }
          : feedback
      );
      return {
        ...state,
        feedbacks: updatedFeedbacks,
        stats: calculateStats(updatedFeedbacks),
      };
    }
    
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    
    case 'SET_FILTER':
      return { ...state, filterBy: action.payload };
    
    default:
      return state;
  }
};

const initialFeedbacks: Feedback[] = [
  {
    id: 'demo-1',
    title: 'Dark Mode Support',
    description: 'It would be great to have a dark mode option for better user experience during night time usage. This could help reduce eye strain and provide a more modern look.',
    category: 'UI',
    votes: 12,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    priority: 'Low',
    status: 'Open',
    tags: []
  },
  {
    id: 'demo-2',
    title: 'Mobile App Version',
    description: 'Consider developing a mobile application for iOS and Android to make the platform more accessible on the go. Push notifications for new updates would be valuable.',
    category: 'Feature',
    votes: 8,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    priority: 'Low',
    status: 'Open',
    tags: []
  },
  {
    id: 'demo-3',
    title: 'Slow Loading Times',
    description: 'The application takes too long to load on slower connections. Consider implementing lazy loading and optimizing images.',
    category: 'Performance',
    votes: 15,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    priority: 'Low',
    status: 'Open',
    tags: []
  },
];

const initialState: FeedbackState = {
  feedbacks: initialFeedbacks,
  sortBy: 'newest',
  filterBy: 'all',
  stats: calculateStats(initialFeedbacks),
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};

interface FeedbackProviderProps {
  children: ReactNode;
}

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(feedbackReducer, initialState);

  const addFeedback = (feedbackData: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt' | 'votes'>) => {
    dispatch({ type: 'ADD_FEEDBACK', payload: feedbackData });
  };

  const deleteFeedback = (id: string) => {
    dispatch({ type: 'DELETE_FEEDBACK', payload: id });
  };

  const voteFeedback = (id: string, increment: boolean) => {
    dispatch({ type: 'VOTE_FEEDBACK', payload: { id, increment } });
  };

  const setSortBy = (sort: SortOption) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  };

  const setFilterBy = (filter: FilterOption) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const filteredAndSortedFeedbacks = sortFeedbacks(
    filterFeedbacks(state.feedbacks, state.filterBy),
    state.sortBy
  );

  return (
    <FeedbackContext.Provider
      value={{
        ...state,
        addFeedback,
        deleteFeedback,
        voteFeedback,
        setSortBy,
        setFilterBy,
        filteredAndSortedFeedbacks,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};