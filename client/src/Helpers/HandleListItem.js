import { auth } from '../Firebase/Firebase';
import axios from 'axios';
import {
    addItemToSeenlist,
    addItemToWatchlist,
    removeItemFromSeenlist,
    removeItemFromWatchlist
} from '../store';

export function handleListAction(actionType, requestType, movie_kv, dispatch, payload = {}) {
    return new Promise((resolve, reject) => {

        let user = auth.currentUser;

        if (user) {
            user.getIdToken(true)
                .then(async (idToken) => {
                    let url = '';

                    if (requestType === 'watchlist') {
                        if (actionType === 'add') {
                            url = `http://${window.location.host}/addWatchlistItem`;
                            payload = {
                                'movie': movie_kv
                            };
                        } else if (actionType === 'remove') {
                            url = `http://${window.location.host}/removeWatchlistItem`;
                        }
                    } else if (requestType === 'seenlist') {
                        if (actionType === 'add') {
                            url = `http://${window.location.host}/addSeenlistItem`;
                            payload = {
                                'movie': movie_kv
                            };
                        } else if (actionType === 'remove') {
                            url = `http://${window.location.host}/removeSeenlistItem`;
                        }
                    }

                    let config = {
                        headers: {
                            'Authorization': idToken,
                        },
                    };

                    if (actionType === 'add') {
                        await axios.post(url, payload, config)
                            .then((result) => {
                                if (requestType === 'watchlist') {
                                    dispatch(addItemToWatchlist(movie_kv));
                                } else if (requestType === 'seenlist') {
                                    dispatch(addItemToSeenlist(movie_kv));
                                }
                                resolve()
                            })
                            .catch((error) => {
                                console.error(error);
                                reject(error)
                            });
                    }
                    else if (actionType === 'remove') {
                        await axios.delete(`${url}/${movie_kv}`, config)
                            .then((result) => {
                                if (requestType === 'watchlist') {
                                    dispatch(removeItemFromWatchlist(movie_kv));
                                } else if (requestType === 'seenlist') {
                                    dispatch(removeItemFromSeenlist(movie_kv));
                                }
                                resolve()
                            })
                            .catch((error) => {
                                console.error(error);
                                reject(error)
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error retrieving ID token:", error);
                });
        }
    });
}


export const AddToWatchlist = (movie_kv, dispatch) => {
    return handleListAction('add', 'watchlist', movie_kv, dispatch);
};

export const AddToSeenlist = (movie_kv, dispatch) => {
    return handleListAction('add', 'seenlist', movie_kv, dispatch);
};

export const RemoveFromWatchlist = (movieId, dispatch) => {
    return handleListAction('remove', 'watchlist', movieId, dispatch);
};

export const RemoveFromSeenlist = (movieId, dispatch) => {
    return handleListAction('remove', 'seenlist', movieId, dispatch);
};

