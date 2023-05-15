import { auth } from '../Firebase/Firebase'
import axios from 'axios';
import { setGenre } from '../store';


export const GetMoviesByGenre = (genre_kv, dispatch) => {
    return new Promise((resolve, reject) => {
        let user = auth.currentUser;
        if (user) {
            user.getIdToken(true)
                .then(async (idToken) => {
                    await axios.get('http://' + window.location.host + '/browse/' + genre_kv[1])
                        .then((result) => {
                            dispatch(setGenre([result.data]))
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
