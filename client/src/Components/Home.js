import { signOutFromGoogle } from "../Firebase/Firebase";
import { Button } from 'react-bootstrap';
import './Home.css';

export const HomePage = () => {
  return (
    <div className="Home">
      <header className="App-header">
        <h1>
          GGWatch - Home page
        </h1>
        <Button className="logout-btn" variant="light" onClick={signOutFromGoogle}>
          Sign out
        </Button>{' '}
      </header>
    </div>
  )
}