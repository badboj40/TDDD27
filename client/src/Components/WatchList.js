import { LoginPage } from '../Components/Login'
import { HomePage } from '../Components/Home'

export function WatchListPage(props) {

    const isSignedIn = props.isSignedIn;

    console.log("Load 'WatchList' page");

  return (
    <div className="WatchList">
        { isSignedIn === true ?
          <HomePage />
          : 
          <LoginPage /> 
        }
    </div>
  )
}