export interface Feedback {
  id: string;
  title: string;
  description: string;
  category: 'UI' | 'Performance' | 'Feature' | 'Bug';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Completed' | 'Rejected';
  votes: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface FeedbackStats {
  total: number;
  byCategory: Record<string, number>;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  totalVotes: number;
  averageVotes: number;
}

export type SortOption = 'newest' | 'oldest' | 'most-voted' | 'least-voted' | 'priority' | 'status';
export type FilterOption = 'all' | 'UI' | 'Performance' | 'Feature' | 'Bug';
export type StatusFilter = 'all' | 'Open' | 'In Progress' | 'Completed' | 'Rejected';
export type PriorityFilter = 'all' | 'Low' | 'Medium' | 'High' | 'Critical';

export type Theme = 'light' | 'dark';

export interface FeedbackFormData {
  title: string;
  description: string;
  category: Feedback['category'];
  priority: Feedback['priority'];
  tags: string[];
}