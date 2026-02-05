/**
 * News Type Definitions
 * TypeScript types for news/announcements system
 */

export interface News {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  isPublished: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface CreateNewsRequest {
  title: string;
  content: string;
  isPublished?: boolean;
}

export interface UpdateNewsRequest {
  title?: string;
  content?: string;
  isPublished?: boolean;
}

export interface NewsListResponse {
  news: News[];
  total: number;
}

export interface NewsResponse {
  news: News;
}
