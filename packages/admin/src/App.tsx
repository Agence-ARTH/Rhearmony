import { Admin, Resource } from 'react-admin';
import { BrowserRouter } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

import {
    CreateGuesser,
    EditGuesser,
    ListGuesser,
    LoginPage,
    ShowGuesser,
    defaultI18nProvider,
    supabaseDataProvider,
    supabaseAuthProvider,
} from 'ra-supabase';

const instanceUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseClient = createClient(instanceUrl, apiKey);
const dataProvider = supabaseDataProvider({
    instanceUrl,
    apiKey,
    supabaseClient,
});
const authProvider = supabaseAuthProvider(supabaseClient, {});

export const App = () => (
    <BrowserRouter>
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={defaultI18nProvider}
            loginPage={LoginPage}
        >
            <Resource
                name="users"
                list={ListGuesser}
                edit={EditGuesser}
                create={CreateGuesser}
                show={ShowGuesser}
            />
            <Resource
                name="pets"
                list={ListGuesser}
                edit={EditGuesser}
                create={CreateGuesser}
                show={ShowGuesser}
            />
        </Admin>
    </BrowserRouter>
);
