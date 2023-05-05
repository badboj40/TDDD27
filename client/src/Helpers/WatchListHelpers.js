import React, { useState, useEffect } from 'react';
import {Tooltip } from 'react-bootstrap'
import { auth } from '../Firebase/Firebase'
import axios from 'axios';
import { WatchListPage } from '../Components/WatchList'

export const addMovieToWatchlistState = (key_value) => {
    console.log("add state")

    WatchListPage.setWatchlistState(previousState => {
        const newObject = { ...previousState, [key_value[0]]: key_value[1] };
        return newObject;
      });
    };

export const removeMovieFromWatchlistState = (movie_id) => {
    console.log("remove state")

    WatchListPage.setWatchlistState(previousState => {
        const newObject = {...previousState};
        delete newObject[movie_id]
        return newObject;
    });
};

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

export const addToWatchlist = async (movie) => {
    console.log("add:", movie)

    let user = auth.currentUser
    if (user) {
        user.getIdToken(true)
            .then(async (idToken) => {
                // ID token to authenticate the user on the backend

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

export const removeFromWatchlist = async (movieId) => {
    console.log("remove:", movieId)

    let user = auth.currentUser
    if (user) {
        user.getIdToken(true)
            .then(async (idToken) => {
                // ID token to authenticate the user on the backend

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