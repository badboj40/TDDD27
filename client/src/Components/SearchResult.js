import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { Card, Container, OverlayTrigger, ToggleButton, Tooltip } from 'react-bootstrap'
import { addWatchlistItem, removeWatchlistItem } from '../store';
import { auth } from '../Firebase/Firebase'
import axios from 'axios';


export function SearchResultPage(props) {
    const isSignedIn = props.isSignedIn;
    const { searchTerm } = useParams();
    const searchResult = useSelector(state => state.search.searchTerm);
    const dispatch = useDispatch();

    const [watchlistState, setWatchlistState] = useState(new Set(JSON.parse(sessionStorage.getItem('watchlist'))));

    const notFoundLogo = "/static/images/unknown-file-icon.png"

    const addMovieToState = movie_id => {
        setWatchlistState(previousState => new Set([...previousState, movie_id]));
    }

    const removeMovieFromState = movie_id => {
        setWatchlistState(previousState => {
            const newState = new Set(previousState);
            newState.delete(movie_id);
            return newState;
        })
    }

    const renderTooltip = (movie_id) => {
        if (watchlistState.has(movie_id)) { // change this condition
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
        if (watchlistState.has(movie_id)) { // change this condition
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
                {searchResult ? (
                    searchResult.map((item, index) => (
                        <Card className="" key={index} style={{ width: '62rem' }}>
                            <div className='row'>
                                <div className='col-sm-5'>
                                    <Card.Img variant="top"
                                        src={item.results.banner} onError={(e) => { e.target.src = notFoundLogo }} />
                                </div>
                                <div className='col-sm-7'>
                                    <Card.Body>
                                        <Card.Title>{item.results.title}</Card.Title>
                                        <Card.Text>{item.results.plot}</Card.Text>
                                        <Card.Text>{item.results.movie_length}min</Card.Text>
                                        {isSignedIn === true ?
                                            <OverlayTrigger
                                                placement="right"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltip(item.results.imdb_id)}
                                            >
                                                <ToggleButton
                                                    id={index}
                                                    type="checkbox"
                                                    variant="success"
                                                    value={index}
                                                    checked={watchlistState.has(item.results.movie_id)}
                                                    onClick={async (e) => {
                                                        if (watchlistState.has(item.results.imdb_id)) {
                                                            removeFromWatchlist(item.results.imdb_id)
                                                            watchlistState.delete(item.results.imdb_id);
                                                            removeMovieFromState(item.results.imdb_id)
                                                        } else {
                                                            addToWatchlist(item.results)
                                                            watchlistState.add(item.results.imdb_id);
                                                            addMovieToState(item.results.imdb_id)
                                                        }
                                                        console.log(watchlistState)
                                                        sessionStorage.setItem("watchlist", JSON.stringify(Array.from(watchlistState)))
                                                    }}
                                                >
                                                    {renderToggleButton(item.results.imdb_id)}
                                                </ToggleButton>
                                            </OverlayTrigger>
                                            :
                                            <></>
                                        }

                                    </Card.Body>
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