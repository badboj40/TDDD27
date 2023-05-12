import { auth } from '../Firebase/Firebase'
import axios from 'axios';
import { setStreamingService } from '../store';


export const GetStreamingService = (movie_kv, dispatch) => {
    return new Promise((resolve, reject) => {
        let user = auth.currentUser;

        if (user) {
            user.getIdToken(true)
                .then(async (idToken) => {
                    let path = '/getStreamingService/';
                    await axios.get('http://' + window.location.host + path + movie_kv[1].title + '/' + movie_kv[1].imdb_id)
                        .then((result) => {
                            dispatch(setStreamingService([movie_kv[1].imdb_id, result.data]))
                            resolve(result.data); // resolve the promise with the result data
                        })
                        .catch((error) => {
                            console.error(error);
                            reject(error); // reject the promise with the error object
                        });
                })
                .catch((error) => {
                    console.error("Error retrieving ID token:", error);
                    reject(error); // reject the promise with the error object
                });
        }
    });
};
