import { supabase } from './supabaseClient';
import { UserState } from './types';

// Helper to get or create a user ID
export const getOrCreateUser = async (): Promise<string> => {
    let userId = localStorage.getItem('rv_user_id');

    if (!userId) {
        if (!supabase) {
            console.warn('Supabase not initialized. Using local storage only.');
            const fallbackId = 'guest_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('rv_user_id', fallbackId);
            return fallbackId;
        }

        const { data, error } = await supabase
            .from('users')
            .insert({})
            .select()
            .maybeSingle();

        if (error || !data) {
            console.error('Error creating user:', error);
            // Fallback for demo
            const fallbackId = 'guest_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('rv_user_id', fallbackId);
            return fallbackId;
        }

        userId = data.id;
        localStorage.setItem('rv_user_id', userId!);
    }

    return userId!;
};

export const recordWin = async (prizeName: string) => {
    if (!supabase) return;
    const userId = await getOrCreateUser();
    const { error } = await supabase
        .from('game_results')
        .insert({
            user_id: userId,
            prize_name: prizeName,
        });

    if (error) {
        console.error('Error recording win:', error);
        throw error;
    }
};

export const submitFeedback = async (rating: number, comment: string) => {
    if (!supabase) return;
    const userId = await getOrCreateUser();
    const { error } = await supabase
        .from('feedback')
        .insert({
            user_id: userId,
            rating,
            comment,
        });

    if (error) {
        console.error('Error submitting feedback:', error);
        throw error;
    }
};

export const saveShippingInfo = async (info: UserState['shippingInfo']) => {
    if (!info || !supabase) return;
    const userId = await getOrCreateUser();

    const { error } = await supabase
        .from('shipping_info')
        .insert({
            user_id: userId,
            name: info.name,
            phone: info.phone,
            province: info.province,
            city: info.city,
            address: info.address,
            zip_code: info.zipCode,
        });

    if (error) {
        console.error('Error saving shipping info:', error);
        throw error;
    }
};

export const fetchUserProfile = async () => {
    if (!supabase) return null;
    const userId = localStorage.getItem('rv_user_id');
    if (!userId) return null;

    try {
        const [shipping, gameResults] = await Promise.all([
            supabase.from('shipping_info').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(1).maybeSingle(),
            supabase.from('game_results').select('*').eq('user_id', userId).order('won_at', { ascending: false }).limit(1).maybeSingle(),
        ]);

        return {
            shippingInfo: shipping.data || null,
            prize: gameResults?.data?.prize_name || null,
            hasSpun: !!gameResults?.data,
        };
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
};
