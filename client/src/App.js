import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'


import { LoginPage } from './Components/Login'
import { HomePage } from './Components/Home'
import { AccountPage } from './Components/Account'
import { MoviesPage } from './Components/Movies'

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
      <Router>
          <Routes>
            <Route exact path="/"/>
            <Route path="/account" component={AccountPage} />
            <Route path="/movies" component={MoviesPage} />
          </Routes>
        </Router>
      { isSignedIn === true ? <HomePage /> : <LoginPage /> }
    </div>
  );
}