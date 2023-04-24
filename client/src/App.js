import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { AccountPage } from './Components/Account'
import { HomePage } from './Components/Home'
import { PageHeader } from './Components/PageHeader'
import { WatchListPage } from './Components/WatchList'
import { SearchResultPage } from './Components/SearchResult'

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
    <Router>
      <div className='App'>
        <PageHeader isSignedIn={isSignedIn}/> 
        <div className='App-body'>
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route path="/account" element={<AccountPage/>} />
            <Route path="/watchlist" element={<WatchListPage isSignedIn={isSignedIn} />} />
            <Route path="/movies/search/:searchTerm" element={<SearchResultPage />} />
          </Routes>  
        </div>
      </div>
    </Router>
  );
}