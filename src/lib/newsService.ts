import { supabase } from './supabase';
import type { News, NewsFormData } from '@/types/database';

export const newsService = {
    // Get all news
    async getAll(publishedOnly = false): Promise<News[]> {
        let query = supabase
            .from('news')
            .select('*')
            .order('published_date', { ascending: false })
            .order('created_at', { ascending: false });

        if (publishedOnly) {
            query = query.eq('status', 'published');
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching news:', error);
            throw error;
        }

        return data || [];
    },

    // Get news by ID
    async getById(id: string): Promise<News | null> {
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching news:', error);
            throw error;
        }

        return data;
    },

    // Get news by category
    async getByCategory(category: string): Promise<News[]> {
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .eq('category', category)
            .eq('status', 'published')
            .order('published_date', { ascending: false });

        if (error) {
            console.error('Error fetching news by category:', error);
            throw error;
        }

        return data || [];
    },

    // Create new news
    async create(newsData: NewsFormData): Promise<News> {
        const { data, error } = await supabase
            .from('news')
            .insert([{
                ...newsData,
                order: 0,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating news:', error);
            throw error;
        }

        return data;
    },

    // Update news
    async update(id: string, newsData: Partial<NewsFormData>): Promise<News> {
        const { data, error } = await supabase
            .from('news')
            .update(newsData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating news:', error);
            throw error;
        }

        return data;
    },

    // Delete news
    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('news')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting news:', error);
            throw error;
        }
    }
};
