import { supabase } from './supabase';
import type { Volume, VolumeFormData } from '@/types/database';

export const volumeService = {
    // Get all volumes
    async getAll(publishedOnly = false): Promise<Volume[]> {
        let query = supabase
            .from('volumes')
            .select('*')
            .order('year', { ascending: false })
            .order('order', { ascending: false });

        if (publishedOnly) {
            query = query.eq('published', true);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching volumes:', error);
            throw error;
        }

        return data || [];
    },

    // Get volume by ID
    async getById(id: string): Promise<Volume | null> {
        const { data, error } = await supabase
            .from('volumes')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching volume:', error);
            throw error;
        }

        return data;
    },

    // Create new volume
    async create(volumeData: VolumeFormData): Promise<Volume> {
        const { data, error } = await supabase
            .from('volumes')
            .insert([{
                ...volumeData,
                order: 0,
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating volume:', error);
            throw error;
        }

        return data;
    },

    // Update volume
    async update(id: string, volumeData: Partial<VolumeFormData>): Promise<Volume> {
        const { data, error } = await supabase
            .from('volumes')
            .update(volumeData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating volume:', error);
            throw error;
        }

        return data;
    },

    // Delete volume
    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('volumes')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting volume:', error);
            throw error;
        }
    },

    // Search volumes
    async search(query: string, year?: string): Promise<Volume[]> {
        let supabaseQuery = supabase
            .from('volumes')
            .select('*')
            .or(`title.ilike.%${query}%,number.ilike.%${query}%`)
            .order('year', { ascending: false });

        if (year) {
            supabaseQuery = supabaseQuery.eq('year', year);
        }

        const { data, error } = await supabaseQuery;

        if (error) {
            console.error('Error searching volumes:', error);
            throw error;
        }

        return data || [];
    }
};
