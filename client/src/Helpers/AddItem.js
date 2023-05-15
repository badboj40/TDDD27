import { auth } from '../Firebase/Firebase'
import axios from 'axios';
import { addItemToSeenlist } from '../store';
import { addItemToWatchlist } from '../store';

export function AddToWatchlist(key_value, dispatch){
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
                        dispatch(addItemToWatchlist(key_value))
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

export function AddToSeenlist(key_value, dispatch){
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
                        dispatch(addItemToSeenlist(key_value))
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