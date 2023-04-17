import { Button } from 'react-bootstrap';
import { PageHeader } from './PageHeader';

import { signOutFromGoogle } from "../Firebase/Firebase";

import './SignOutButton.css';

export function AccountPage() {
  return (
    <div className="Account">
      <header>
      <PageHeader/>
        <Button className="logout-btn" variant="light" onClick={signOutFromGoogle}>
          Sign out
        </Button>{' '}
      </header>
    </div>
  )
}