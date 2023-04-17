import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { AccountPage } from './Account'
import { MoviesPage } from './Movies'
import { PageHeader } from './PageHeader';

import './SignOutButton.css';

export function HomePage() {
  console.log("Load 'Home' page");

  return (
    <div className="Home">   
      <header className="Home-header">
        <PageHeader/>
        <Router>
          <Routes>
            <Route exact path="/"/>
            <Route path="/account" element={<AccountPage/>} />
            <Route path="/movies" element={<MoviesPage/>} />
          </Routes>
        </Router>
      </header>     
    </div>
  )
}
