import { signInWithGoogle } from "../Firebase/Firebase"
import { useDispatch } from "react-redux"
import './Login.css'

export const LoginPage = () => {
  const dispatch = useDispatch()
  return (
    <div className="Login">
      <header className="App-header">
        <h1>
          You must be logged in to access this feature
        </h1>
        <button className="login-with-google-btn" onClick={() => signInWithGoogle(dispatch)}>
          Sign in with Google
        </button>
      </header>
    </div>
  )
}