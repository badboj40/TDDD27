import './App.css';
import { signInWithGoogle } from './Firebase';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Oisko boiski.
        </p>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </header>
    </div>
  );
}

export default App;
