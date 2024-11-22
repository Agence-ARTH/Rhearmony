import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { Jwt } from 'https://deno.land/x/hono@v2.6.2/utils/jwt/index.ts';
import { createErrorResponse, corsHeaders } from '../_shared/utils.ts';
import { supabaseClient } from '../_shared/supabaseClient.ts';

const { decode } = Jwt;

async function loginAdmin(req: Request) {
    const { email, password } = await req.json();
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return createErrorResponse(401, 'Unauthorized');
    }

    if (!data.session) {
        return createErrorResponse(401, 'Unauthorized');
    }
    const jwt = decode(data.session.access_token);

    if (!jwt.payload || jwt.payload.user_role !== 'admin') {
        return createErrorResponse(401, 'Unauthorized');
    }
    
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
}

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: corsHeaders,
        });
    }

    if (req.method === 'POST') {
        return loginAdmin(req);
    }

    return createErrorResponse(405, 'Method Not Allowed');
});
