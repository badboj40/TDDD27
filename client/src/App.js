import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AccountPage } from './Components/Account'
import { HomePage } from './Components/Home'
import { PageHeader } from './Components/PageHeader'
import { WatchListPage } from './Components/Watchlist'
import { SeenListPage } from './Components/Seenlist'
import { MoviePage } from './Components/Movie'
import { SearchResultPage } from './Components/SearchResult'
import { LoginPage } from './Components/Login'
import { BrowsePage } from './Components/Browse'
import { auth } from './Firebase/Firebase'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowseGenrePage } from './Components/BrowseGenre'


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
            <Route path="/browse" element={<BrowsePage/>} />
            <Route path="/browse/:genre" element={<BrowseGenrePage/>}/>
            <Route path="/account" element={<AccountPage/>} />
            <Route path="/watchlist" element={isSignedIn ? <WatchListPage/> : <LoginPage/> } />
            <Route path="/seen" element={isSignedIn ? <SeenListPage/> : <LoginPage/> } />
            <Route path="/movie/:movieId" element={<MoviePage isSignedIn={isSignedIn}/>}/>
            <Route path="/movies/search/:searchTerm" element={<SearchResultPage isSignedIn={isSignedIn} />} />
          </Routes>  
        </div>
      </div>
    </Router>
  );
}