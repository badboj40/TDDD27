

export function WatchListPage() {
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