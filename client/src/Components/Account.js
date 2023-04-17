import { Button } from 'react-bootstrap';

import { signOutFromGoogle } from "../Firebase/Firebase";

import './SignOutButton.css';

export function AccountPage() {
    console.log("Load 'Account' page");
  return (
    <div className="Account">
        <Button className="logout-btn" variant="light" onClick={signOutFromGoogle}>
            Sign out
        </Button>{' '}
    </div>
  )
}