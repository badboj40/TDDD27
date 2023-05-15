import { auth } from '../Firebase/Firebase'
import axios from 'axios';
import { setHomeMovies } from '../store';


export const GetHomeMovies = (dispatch) => {
    return new Promise((resolve, reject) => {
        let user = auth.currentUser;

        if (user) {
            user.getIdToken(true)
                .then(async (idToken) => {
                    await axios.get('http://' + window.location.host + '/home')
                        .then(async (result) => {
                            await dispatch(setHomeMovies(result.data))
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
