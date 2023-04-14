import React, { useState } from 'react'

import { LoginPage } from './Components/Login'
import { HomePage } from './Components/Home'

import { auth } from './Firebase/Firebase'

import './App.css';

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
      { isSignedIn === true ? <HomePage /> : <LoginPage /> }
    </div>
  );
}