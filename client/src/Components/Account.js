import { Button } from 'react-bootstrap';

import { signOutFromGoogle } from "../Firebase/Firebase";

import './Home.css';

export function AccountPage() {
  return (
    <div className="Account">
      <header>
        <Button className="logout-btn" variant="light" onClick={signOutFromGoogle}>
          Sign out
        </Button>{' '}
      </header>
    </div>
  )
}