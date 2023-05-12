import { auth } from '../Firebase/Firebase'
import axios from 'axios';
import { setStreamingService } from '../store';


export const GetStreamingService = (movie_kv, dispatch) => {
    let user = auth.currentUser

    if (user) {
        user.getIdToken(true)
            .then(async (idToken) => {
                // Use the ID token to authenticate the user with your backend server

                let path = '/getStreamingService/';
                console.log(movie_kv[1].title)
                // Make an Axios request with the ID token as the Bearer token
                await axios.get('http://' + window.location.host + path + movie_kv[1].title + '/' + movie_kv[1].imdb_id)
                    .then((result) => {
                        dispatch(setStreamingService([movie_kv[1].imdb_id, result.data]))
                        console.log("result from streaming axios", result.data)
                        console.log("services", result.data.services)
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