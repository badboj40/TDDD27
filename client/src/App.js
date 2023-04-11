import './App.css';
import { signInWithGoogle, signOutFromGoogle } from './Firebase';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          GGWatch
        </h1>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
        <button onClick={signOutFromGoogle}>
          Sign out
        </button>
      </header>
    </div>
  );
}

export default App;
