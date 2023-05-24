import { auth } from '../Firebase/Firebase'
import axios from 'axios';
import { setMovie, setStreamingService, setGenre, setMovieGenres, setHomeMovies, setMoviesByGenre } from '../store';

export const fetchData = async (url, dispatch, actionType, movie_kv) => {
    try {
        const user = auth.currentUser;
        if (user) {
            const idToken = await user.getIdToken(true);
            const response = await axios.get(url, {
                headers: { Authorization: idToken }
            });

            if (actionType === setStreamingService) {
                dispatch(setStreamingService([movie_kv[1].imdb_id, response.data]));
                dispatch(setMovie(movie_kv));
            } else {
                dispatch(actionType(response.data));
            }

            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
};

export const GetStreamingService = (movie_kv, dispatch) => {
    const url = `http://${window.location.host}/getStreamingService/${movie_kv[1].title}/${movie_kv[1].imdb_id}`;
    return fetchData(url, dispatch, setStreamingService, movie_kv);
};

export const GetMoviesByGenre = (genre, page, dispatch) => {
    const url = `http://${window.location.host}/browse/${genre}/${page}`;
    return fetchData(url, dispatch, setMoviesByGenre);
};

export const GetMovieGenres = (dispatch) => {
    const url = `http://${window.location.host}/genres`;
    return fetchData(url, dispatch, setMovieGenres);
};

export const GetHomeMovies = (page, dispatch) => {
    const url = `http://${window.location.host}/home/${page}`;
    return fetchData(url, dispatch, setHomeMovies);
};
