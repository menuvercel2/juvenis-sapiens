import { supabase } from './supabase';

export const authService = {
    // Sign in with email and password
    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Error signing in:', error);
            throw error;
        }

        return data;
    },

    // Sign out
    async signOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    },

    // Get current session
    async getSession() {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error('Error getting session:', error);
            throw error;
        }

        return session;
    },

    // Get current user
    async getUser() {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
            console.error('Error getting user:', error);
            throw error;
        }

        return user;
    },

    // Check if user is admin
    async isAdmin(): Promise<boolean> {
        try {
            const user = await this.getUser();

            if (!user) return false;

            const { data, error } = await supabase
                .from('admins')
                .select('id')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error checking admin status:', error);
                return false;
            }

            return !!data;
        } catch (error) {
            console.error('Error in isAdmin:', error);
            return false;
        }
    },

    // Listen to auth state changes
    onAuthStateChange(callback: (event: string, session: any) => void) {
        return supabase.auth.onAuthStateChange(callback);
    }
};
