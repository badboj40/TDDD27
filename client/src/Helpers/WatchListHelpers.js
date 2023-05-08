import {Tooltip } from 'react-bootstrap'
import { auth } from '../Firebase/Firebase'
import axios from 'axios';
import { WatchListPage } from '../Components/WatchList'

export const renderWatchlistTooltip = async (movie_id) => {
    if (await WatchListPage.watchlistState.hasOwnProperty(movie_id)) { // change this condition
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

export const renderToggleButton = async (movie_id) => {
    if (await WatchListPage.watchlistState.hasOwnProperty(movie_id)) { // change this condition
        return 'x'
    } else {
        return '+'
    }
};

export const addToWatchlist = async (key_value) => {
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
                        WatchListPage.setWatchlistState(previousState => {
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

export const removeFromWatchlist = async (movieId) => {
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
                        WatchListPage.setWatchlistState(previousState => {
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