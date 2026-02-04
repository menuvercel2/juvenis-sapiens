
import { supabase } from './supabase';

export const storageService = {
    /**
     * Uploads a file to a specific bucket
     * @param bucket 'covers' | 'pdfs' | 'news'
     * @param path The path/filename inside the bucket
     * @param file The file object from the input
     * @returns The public URL of the uploaded file
     */
    async uploadFile(bucket: 'covers' | 'pdfs' | 'news', path: string, file: File): Promise<string> {
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(path, file, {
                cacheControl: '3600',
                upsert: true
            });

        if (error) {
            console.error(`Error uploading to ${bucket}:`, error);
            throw error;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return publicUrl;
    },

    /**
     * Deletes a file from a bucket
     * @param bucket 'covers' | 'pdfs' | 'news'
     * @param path The path of the file to delete
     */
    async deleteFile(bucket: 'covers' | 'pdfs' | 'news', path: string): Promise<void> {
        const { error } = await supabase.storage
            .from(bucket)
            .remove([path]);

        if (error) {
            console.error(`Error deleting from ${bucket}:`, error);
            throw error;
        }
    }
};
