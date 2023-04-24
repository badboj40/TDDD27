import { LoginPage } from '../Components/Login'
import { HomePage } from '../Components/Home'

export function WatchListPage(props) {

    const isSignedIn = props.isSignedIn;

    console.log("Load 'WatchList' page, on new branch");

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