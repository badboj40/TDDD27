import { signOutFromGoogle } from "../Firebase/Firebase";
import './Home.css';

export const HomePage = () => {
  return (
    <div className="Home">
      <header className="App-header">
        <h1>
          GGWatch - Home page
        </h1>
        <button className="logout-btn" onClick={signOutFromGoogle}>
          Sign out
        </button>
      </header>
    </div>
  )
}