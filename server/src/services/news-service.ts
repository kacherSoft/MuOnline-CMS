/**
 * News Service
 * Business logic for news/announcements CRUD operations
 */

import { executeQuery, executeInsert } from '../lib/mysql-connection-pool.js';
import type {
  News,
  CreateNewsRequest,
  UpdateNewsRequest,
  NewsListResponse,
  NewsResponse,
} from '../types/news-types.js';
import { logger } from '../utils/winston-logger.js';

export class NewsService {
  /**
   * Get all published news (public endpoint)
   */
  static async getPublishedNews(): Promise<NewsListResponse> {
    const news = await executeQuery<News>(
      `SELECT id, title, content, author_id as authorId, author_name as authorName,
              is_published as isPublished, created_at as createdAt, updated_at as updatedAt
       FROM news
       WHERE is_published = true
       ORDER BY created_at DESC`
    );

    return { news, total: news.length };
  }

  /**
   * Get all news (including drafts) - admin only
   */
  static async getAllNews(): Promise<NewsListResponse> {
    const news = await executeQuery<News>(
      `SELECT id, title, content, author_id as authorId, author_name as authorName,
              is_published as isPublished, created_at as createdAt, updated_at as updatedAt
       FROM news
       ORDER BY created_at DESC`
    );

    return { news, total: news.length };
  }

  /**
   * Get single news by ID
   */
  static async getNewsById(id: number): Promise<News> {
    const news = await executeQuery<News>(
      `SELECT id, title, content, author_id as authorId, author_name as authorName,
              is_published as isPublished, created_at as createdAt, updated_at as updatedAt
       FROM news
       WHERE id = ?`,
      [id]
    );

    if (news.length === 0) {
      throw new Error('News not found');
    }

    return news[0];
  }

  /**
   * Create new news post
   */
  static async createNews(
    data: CreateNewsRequest,
    authorId: number,
    authorName: string
  ): Promise<News> {
    const now = Date.now();
    const newsId = await executeInsert(
      `INSERT INTO news (title, content, author_id, author_name, is_published, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.title,
        data.content,
        authorId,
        authorName,
        data.isPublished ?? false,
        now,
        now,
      ]
    );

    logger.info(`News created: ID ${newsId} by ${authorName}`);

    return {
      id: newsId,
      title: data.title,
      content: data.content,
      authorId,
      authorName,
      isPublished: data.isPublished ?? false,
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Update news post
   */
  static async updateNews(id: number, data: UpdateNewsRequest): Promise<News> {
    const existing = await this.getNewsById(id);

    const updates: string[] = [];
    const values: (string | number | boolean)[] = [];

    if (data.title !== undefined) {
      updates.push('title = ?');
      values.push(data.title);
    }
    if (data.content !== undefined) {
      updates.push('content = ?');
      values.push(data.content);
    }
    if (data.isPublished !== undefined) {
      updates.push('is_published = ?');
      values.push(data.isPublished);
    }

    if (updates.length === 0) {
      return existing;
    }

    updates.push('updated_at = ?');
    values.push(Date.now());
    values.push(id);

    await executeQuery(
      `UPDATE news SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    logger.info(`News updated: ID ${id}`);

    return this.getNewsById(id);
  }

  /**
   * Delete news post
   */
  static async deleteNews(id: number): Promise<void> {
    const existing = await this.getNewsById(id);

    await executeQuery('DELETE FROM news WHERE id = ?', [id]);

    logger.info(`News deleted: ID ${id}`);
  }

  /**
   * Publish news post
   */
  static async publishNews(id: number): Promise<News> {
    return this.updateNews(id, { isPublished: true });
  }

  /**
   * Unpublish news post
   */
  static async unpublishNews(id: number): Promise<News> {
    return this.updateNews(id, { isPublished: false });
  }
}

export default NewsService;
