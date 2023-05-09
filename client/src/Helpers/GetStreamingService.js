import { auth } from '../Firebase/Firebase'
import axios from 'axios';
import { removeItemFromWatchlist } from '../store';


// WIP
export const GetStreamingService= (movie_kv, dispatch) => {
    let user = auth.currentUser
    
    if (user) {
        user.getIdToken(true)
            .then(async (idToken) => {
                // Use the ID token to authenticate the user with your backend server

                // Make an Axios request with the ID token as the Bearer token
                await axios.delete('http://' + window.location.host + '/getStreamingService/', {
                    headers: {
                        Authorization: idToken,
                    },
                })
                    .then((result) => {
                        dispatch(removeItemFromWatchlist(movieId))
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