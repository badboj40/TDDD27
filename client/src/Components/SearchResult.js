import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react';
import { Card, Container, OverlayTrigger, Row, ToggleButton, Tooltip } from 'react-bootstrap'
import { auth } from '../Firebase/Firebase'
import axios from 'axios';
import { addToWatchlist, 
    addMovieToWatchlistState, 
    removeFromWatchlist, 
    removeMovieFromWatchlistState, 
    renderWatchlistTooltip, 
    renderToggleButton } from '../Helpers/WatchListHelpers'



export function SearchResultPage(props) {
    const isSignedIn = props.isSignedIn;
    const searchResult = useSelector(state => state.search.searchTerm);

    const [watchlistState, setWatchlistState] = useState(JSON.parse(sessionStorage.getItem('watchlist')));

    const notFoundLogo = "/static/images/unknown-file-icon.png"

    useEffect(() => {
        console.log("watchlistState", watchlistState);
        sessionStorage.setItem("watchlist", JSON.stringify(watchlistState));
      }, [watchlistState]);

    // const addMovieToState = (key_value) => {
    //     console.log("add state")

    //     setWatchlistState(previousState => {
    //         const newObject = { ...previousState, [key_value[0]]: key_value[1] };
    //         return newObject;
    //       });
    //     };

    // const removeMovieFromState = (movie_id) => {
    //     console.log("remove state")

    //     setWatchlistState(previousState => {
    //         const newObject = {...previousState};
    //         delete newObject[movie_id]
    //         return newObject;
    //     });
    // };

    // useEffect(() => {
    //     console.log("watchlistState", watchlistState);
    //     sessionStorage.setItem("watchlist", JSON.stringify(watchlistState));
    //   }, [watchlistState]);

    // const renderWatchlistTooltip = (movie_id) => {
    //     if (watchlistState.hasOwnProperty(movie_id)) { // change this condition
    //         return (
    //             <Tooltip id="button-tooltip">
    //                 Remove from my watchlist
    //             </Tooltip>
    //         );
    //     } else {
    //         return (
    //             <Tooltip id="button-tooltip">
    //                 Add to my watchlist
    //             </Tooltip>
    //         );
    //     }
    // };

    // const renderToggleButton = (movie_id) => {
    //     if (watchlistState.hasOwnProperty(movie_id)) { // change this condition
    //         return 'x'
    //     } else {
    //         return '+'
    //     }
    // };


    // const addToWatchlist = async (movie) => {
    //     console.log("add:", movie)

    //     let user = auth.currentUser
    //     if (user) {
    //         user.getIdToken(true)
    //             .then(async (idToken) => {
    //                 // ID token to authenticate the user on the backend

    //                 await axios.post('http://' + window.location.host + '/addWatchlistItem', {
    //                     'idToken': idToken,
    //                     'movie': movie,
    //                 })
    //                     .then((result) => {
    //                     })
    //                     .catch((error) => {
    //                         console.error(error);
    //                     });
    //             })
    //             .catch((error) => {
    //                 // Handle any errors that occur while retrieving the ID token
    //                 console.error("Error retrieving ID token:", error);
    //             });
    //     }
    // };

    // const removeFromWatchlist = async (movieId) => {
    //     console.log("remove:", movieId)

    //     let user = auth.currentUser
    //     if (user) {
    //         user.getIdToken(true)
    //             .then(async (idToken) => {
    //                 // ID token to authenticate the user on the backend

    //                 await axios.delete('http://' + window.location.host + '/removeWatchlistItem/' + movieId, {
    //                     headers: {
    //                         Authorization: idToken,
    //                     },
    //                 })
    //                     .then((result) => {
    //                     })
    //                     .catch((error) => {
    //                         console.error(error);
    //                     });
    //             })
    //             .catch((error) => {
    //                 // Handle any errors that occur while retrieving the ID token
    //                 console.error("Error retrieving ID token:", error);
    //             });
    //     }
    // };
    

    return (
        <div className="SearchResult">
            <Container className=''>
                {searchResult ? (
                    Object.entries(searchResult).map((key_value) => (
                        <Card className="" key={key_value[0]} style={{ width: '62rem' }}>
                            <Row>
                                <div className='col-sm-5'>
                                    <Card.Img variant="top"
                                        src={key_value[1].banner} onError={(e) => { e.target.src = notFoundLogo }} />
                                </div>
                                <div className='col-sm-7'>
                                    <Card.Body>
                                        <Card.Title>{key_value[1].title}</Card.Title>
                                        <Card.Text>{key_value[1].plot}</Card.Text>
                                        <Card.Text>{key_value[1].movie_length}min</Card.Text>
                                        {isSignedIn === true ?
                                            <OverlayTrigger
                                                placement="right"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderWatchlistTooltip(key_value[1].imdb_id)}
                                            >
                                                <ToggleButton
                                                    id={key_value[0]}
                                                    type="checkbox"
                                                    variant="success"
                                                    value={key_value[0]}
                                                    checked={watchlistState.hasOwnProperty(key_value[0])}
                                                    style={{borderWidth: '2px', borderColor: 'black', fontWeight: 'bold'}}
                                                    onClick={ () => {
                                                        if (watchlistState.hasOwnProperty(key_value[0])) {
                                                            removeFromWatchlist(key_value[0])
                                                            removeMovieFromWatchlistState(key_value[0])
                                                        } else {
                                                            addToWatchlist(key_value[1])
                                                            addMovieToWatchlistState(key_value)
                                                        }
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
                            </Row>
                        </Card>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </Container>
        </div >
    )
}