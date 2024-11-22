import { signInAction } from '../actions';

export default async function Login() {
    return (
        <form>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <button formAction={signInAction}>Log in</button>
        </form>
    );
}
