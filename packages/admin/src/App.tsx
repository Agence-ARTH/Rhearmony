import { Admin, Resource } from 'react-admin';
import { BrowserRouter } from 'react-router-dom';

import {
    CreateGuesser,
    EditGuesser,
    ListGuesser,
    LoginPage,
    ShowGuesser,
    defaultI18nProvider,
} from 'ra-supabase';
import { dataProvider } from './provider/dataProvider';
import { authProvider } from './provider/authProvider';

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
