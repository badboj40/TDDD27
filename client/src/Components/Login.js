import { signInWithGoogle } from "../Firebase/Firebase"
import './Login.css'

export const LoginPage = () => {
return (
    <div className="Login">
      <header className="App-header">
        <h1>
          You must be logged in to access this feature
        </h1>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </header>
    </div>
)
}