import { useSelector } from 'react-redux'
import { useState } from 'react';
import { Card, Container, OverlayTrigger, ToggleButton, Tooltip } from 'react-bootstrap'
import { auth } from '../Firebase/Firebase'
import axios from 'axios';


export function WatchListPage(props) {
    const isSignedIn = props.isSignedIn;
    const searchResult = useSelector(state => state.search.searchTerm);

    const [watchlistState, setWatchlistState] = useState(JSON.parse(sessionStorage.getItem('watchlist')));

    const notFoundLogo = "/static/images/unknown-file-icon.png"

    const addMovieToState = key_value => {
        setWatchlistState(previousState => {
            const newObject = {...previousState};
            newObject[key_value[0]] = key_value[1]
            return newObject;
        })
    }

    const removeMovieFromState = movie_id => {
        setWatchlistState(previousState => {
            const newObject = {...previousState};
            delete newObject[movie_id]
            return newObject;
        })
    }

    const renderTooltip = (movie_id) => {
        if (watchlistState.hasOwnProperty(movie_id)) { // change this condition
            return (
                <Tooltip id="button-tooltip">
                    Remove from my watchlist
                </Tooltip>
            );
        } else {
            return (
                <Tooltip id="button-tooltip">
                    Add to my watchlist
                </Tooltip>
            );
        }
    };

    const renderToggleButton = (movie_id) => {
        if (watchlistState.hasOwnProperty(movie_id)) { // change this condition
            return 'x'
        } else {
            return '+'
        }
    };


    const addToWatchlist = async (movie) => {
        console.log("add", movie)

        let user = auth.currentUser
        if (user) {
            user.getIdToken(true)
                .then(async (idToken) => {
                    // Use the ID token to authenticate the user with your backend server

                    // Make an Axios request with the ID token as the Bearer token
                    await axios.post('http://' + window.location.host + '/addWatchlistItem', {
                        'idToken': idToken,
                        'movie': movie,
                    })
                        .then((result) => {
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    // Handle any errors that occur while retrieving the ID token
                    console.error("Error retrieving ID token:", error);
                });
        }
    };

    const removeFromWatchlist = async (movieId) => {
        console.log("remove", movieId)

        let user = auth.currentUser
        if (user) {
            user.getIdToken(true)
                .then(async (idToken) => {
                    // Use the ID token to authenticate the user with your backend server

                    // Make an Axios request with the ID token as the Bearer token
                    await axios.delete('http://' + window.location.host + '/removeWatchlistItem/' + movieId, {
                        headers: {
                            Authorization: idToken,
                        },
                    })
                        .then((result) => {
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    // Handle any errors that occur while retrieving the ID token
                    console.error("Error retrieving ID token:", error);
                });
        }
    };
    

    return (
        <div className="SearchResult">
            <Container className=''>
                {watchlistState ? (
                    Object.entries(watchlistState).map((key_value) => (
                        <Card className="" key={key_value[0]} style={{ width: '40rem' }}>
                            <div className=''>
                                <div className='col-sm-7'>
                                    <Card.Body>
                                        <Card.Title>{key_value[1].title}</Card.Title>
                                        {isSignedIn === true ?
                                            <OverlayTrigger
                                                placement="right"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltip(key_value[1].imdb_id)}
                                            >
                                                <ToggleButton
                                                    id={key_value[0]}
                                                    type="checkbox"
                                                    variant="success"
                                                    value={key_value[0]}
                                                    checked={watchlistState.hasOwnProperty(key_value[0])}
                                                    onClick={async (e) => {
                                                        if (watchlistState.hasOwnProperty(key_value[0])) {
                                                            removeFromWatchlist(key_value[0])
                                                            removeMovieFromState(key_value[0])
                                                        } else {
                                                            addToWatchlist(key_value[1])
                                                            addMovieToState(key_value)
                                                        }
                                                        console.log(watchlistState)
                                                        sessionStorage.setItem("watchlist", JSON.stringify(watchlistState))
                                                    }}
                                                >
                                                    {renderToggleButton(key_value[0])}
                                                </ToggleButton>
                                            </OverlayTrigger>
                                            :
                                            <></>
                                        }

                                    </Card.Body>
                                </div>
                                <div className='col-sm-5'>
                                    <Card.Img variant="top"
                                        src={key_value[1].banner} onError={(e) => { e.target.src = notFoundLogo }} />
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </Container>
        </div >
    )
}