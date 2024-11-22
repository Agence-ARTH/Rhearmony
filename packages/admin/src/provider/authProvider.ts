import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabaseAuthProvider } from 'ra-supabase';
import { AuthProvider } from 'react-admin';
import { supabaseClient } from './supabaseClient';

const baseAuthProvider = supabaseAuthProvider(supabaseClient, {});

export const authProvider: AuthProvider = {
    ...baseAuthProvider,
    async login(params) {
        const emailPasswordParams = params as LoginWithEmailPasswordParams;
        if (emailPasswordParams.email && emailPasswordParams.password) {
            const { data, error } = await supabaseClient.functions.invoke(
                'loginAdmin',
                {
                    method: 'POST',
                    body: emailPasswordParams,
                }
            );

            if (error && error instanceof FunctionsHttpError) {
                const errorMessage = await error.context.json();
                throw new Error(errorMessage.message);
            }

            const { session } = data;
            if (!session) {
                throw new Error('Unauthorized');
            }

            await supabaseClient.auth.setSession({
                access_token: session.access_token,
                refresh_token: session.refresh_token,
            });

            return;
        }
        return Promise.reject(new Error('Invalid login parameters'));
    },
};

type LoginWithEmailPasswordParams = {
    email: string;
    password: string;
};
