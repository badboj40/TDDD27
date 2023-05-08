import React, { useState, useEffect } from 'react';
import { Card, Col, Container, OverlayTrigger, Row, ToggleButton, Tooltip } from 'react-bootstrap'
import { auth } from '../Firebase/Firebase'
import axios from 'axios';


export function SeenListPage() {
    const [seenlistState, setSeenlistState] = useState(JSON.parse(sessionStorage.getItem('seenlist')));
    const [watchlistState, setWatchlistState] = useState(JSON.parse(sessionStorage.getItem('watchlist')));

    const notFoundLogo = "/static/images/unknown-file-icon.png"
    const checkMarkLogo = "/static/images/check_mark.png"

    const cardWidth = '20rem'

    useEffect(() => {
        sessionStorage.setItem("watchlist", JSON.stringify(watchlistState));
    }, [watchlistState]);

    useEffect(() => {
        sessionStorage.setItem("seenlist", JSON.stringify(seenlistState));
    }, [seenlistState]);


    const addToWatchlist = async (key_value) => {
        let user = auth.currentUser
        if (user) {
            user.getIdToken(true)
                .then(async (idToken) => {
                    // ID token to authenticate the user on the backend

                    await axios.post('http://' + window.location.host + '/addWatchlistItem', {
                        'idToken': idToken,
                        'movie': key_value[1],
                    })
                        .then((result) => {
                            setWatchlistState(previousState => {
                                const newObject = { ...previousState, [key_value[0]]: key_value[1] };
                                return newObject;
                            });
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

    const addToSeenlist = async (key_value) => {
        let user = auth.currentUser
        if (user) {
            user.getIdToken(true)
                .then(async (idToken) => {
                    // ID token to authenticate the user on the backend

                    await axios.post('http://' + window.location.host + '/addSeenlistItem', {
                        'idToken': idToken,
                        'movie': key_value[1],
                    })
                        .then((result) => {
                            setSeenlistState(previousState => {
                                const newObject = { ...previousState, [key_value[0]]: key_value[1] };
                                return newObject;
                            });
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
                            setWatchlistState(previousState => {
                                const newObject = { ...previousState };
                                delete newObject[movieId]
                                return newObject;
                            })
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

    const removeFromSeenlist = async (movieId) => {
        let user = auth.currentUser
        if (user) {
            user.getIdToken(true)
                .then(async (idToken) => {
                    // Use the ID token to authenticate the user with your backend server

                    // Make an Axios request with the ID token as the Bearer token
                    await axios.delete('http://' + window.location.host + '/removeSeenlistItem/' + movieId, {
                        headers: {
                            Authorization: idToken,
                        },
                    })
                        .then((result) => {
                            setSeenlistState(previousState => {
                                const newObject = { ...previousState };
                                delete newObject[movieId]
                                return newObject;
                            })
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

    const renderWatchlistTooltip = (movie_id) => {
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

    const renderSeenlistTooltip = (movie_id) => {
        if (seenlistState.hasOwnProperty(movie_id)) { // change this condition
            return (
                <Tooltip id="button-tooltip">
                    Mark as unseen
                </Tooltip>
            );
        } else {
            return (
                <Tooltip id="button-tooltip">
                    Mark as seen
                </Tooltip>
            );
        }
    };

    const renderToggleButtonElement = (movie_id, state_dict, disable_content, enable_content) => {
        if(state_dict === 'watchlist'){
            if (watchlistState.hasOwnProperty(movie_id)) {
                return disable_content
            } else {
                return enable_content
            }
        }else if(state_dict === 'seenlist'){
            if (seenlistState.hasOwnProperty(movie_id)) {
                return disable_content
            } else {
                return enable_content
            }
        }
        return null
    };


    return (
        <div className="Seenlist">
            <Container className='grid'>
                <Row md={8} className="gy-5">
                    {seenlistState ? (
                        Object.entries(seenlistState).map((key_value) => (
                            <Col md={4} key={key_value[0]}>
                                <Card style={{ width: cardWidth }}>
                                    <Container style={{ postition: 'relative', padding: 0 }}>
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderWatchlistTooltip(key_value[1].imdb_id)}
                                        >
                                            {/* watchlist-knappen */}
                                            <ToggleButton
                                                id={key_value[0]}
                                                type="checkbox"
                                                variant={renderToggleButtonElement(key_value[0], 'watchlist', 'success', 'light')}
                                                value={key_value[0]}
                                                checked={watchlistState.hasOwnProperty(key_value[0])}
                                                onClick={async () => {
                                                    if (watchlistState.hasOwnProperty(key_value[0])) {
                                                        removeFromWatchlist(key_value[0])
                                                    } else {
                                                        addToWatchlist(key_value)
                                                    }
                                                }}
                                                style={{ position: 'absolute', borderWidth: '2px', borderColor: 'black', opacity: '0.9', fontWeight: 'bold' }}
                                            >
                                                {renderToggleButtonElement(key_value[0], 'watchlist', 'x', '+')}
                                            </ToggleButton>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderSeenlistTooltip(key_value[1].imdb_id)}
                                        >
                                            {/* Seenlist-knappen */}
                                            <ToggleButton
                                                id={key_value[0]}
                                                type="checkbox"
                                                variant="dark"
                                                value={key_value[0]}
                                                checked={seenlistState.hasOwnProperty(key_value[0])}
                                                onClick={async () => {
                                                    if (seenlistState.hasOwnProperty(key_value[0])) {
                                                        removeFromSeenlist(key_value[0])
                                                    } else {
                                                        addToSeenlist(key_value)
                                                    }
                                                }}
                                                style={{ position: 'absolute', right: '0', borderWidth: '2px', borderColor: 'black', opacity: '0.9', fontWeight: 'bold' }}
                                            >
                                                <img
                                                    src={checkMarkLogo}
                                                    width="15"
                                                    height="15"
                                                    className=""
                                                    alt="checkmark"
                                                    style={renderToggleButtonElement(key_value[0], 'seenlist', {filter: 'grayscale(0%)'}, {filter: 'grayscale(100%)'})}
                                                />
                                            </ToggleButton>
                                        </OverlayTrigger>
                                        <Card.Img variant="top"
                                            src={key_value[1].banner} onError={(e) => { e.target.src = notFoundLogo }} />
                                    </Container>
                                    <div className=''>
                                        <Card.Body>
                                            <Card.Title className=''
                                                style={{ fontSize: '20px' }}>{key_value[1].title}</Card.Title>


                                        </Card.Body>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <h2>No movies in your watchlist.</h2>
                    )}
                </Row>
            </Container>
        </div >
    )
}