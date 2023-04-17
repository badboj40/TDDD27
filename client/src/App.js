import React, { useState } from 'react'


import { LoginPage } from './Components/Login'
import { HomePage } from './Components/Home'
import { PageHeader } from './Components/PageHeader'


import { auth } from './Firebase/Firebase'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  })

  return (
    <div className='App'>
      { isSignedIn === true ? <PageHeader />: <></>}
      { isSignedIn === true ? <HomePage /> : <LoginPage /> }
    </div>
  );
}