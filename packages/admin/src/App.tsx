import { Admin, AuthProvider, Resource } from "react-admin";
import { BrowserRouter } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";

import {
  CreateGuesser,
  EditGuesser,
  ListGuesser,
  LoginPage,
  ShowGuesser,
  defaultI18nProvider,
  supabaseDataProvider,
  supabaseAuthProvider,
} from "ra-supabase";

const instanceUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseClient = createClient(instanceUrl, apiKey);
const dataProvider = supabaseDataProvider({
  instanceUrl,
  apiKey,
  supabaseClient,
});
const baseAuthProvider = supabaseAuthProvider(supabaseClient, {});
const authProvider: AuthProvider = {
  ...baseAuthProvider,
  login: async (params) => {
    const result = await baseAuthProvider.login(params);
    const { data } = await supabaseClient.auth.getSession();
    if (!data?.session?.access_token) {
      throw new Error("Access Denied - No access token");
    }
    const jwt = jwtDecode(data.session.access_token);

    if (!jwt?.user_role) {
      throw new Error("Access Denied - No user role");
    }
    const userRole = jwt.user_role;
    if (userRole !== "admin") {
      throw new Error("Access Denied - You are not an admin");
    }
    return result;
  },
};

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
