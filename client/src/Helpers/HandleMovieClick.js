import { setMovie } from "../store";
import { GetStreamingService } from "./GetStreamingService";


export const HandleMovieClick = async (movie_kv, dispatch, navigate) => {
    setMovie(movie_kv[1])
    await GetStreamingService(movie_kv, dispatch)
        .then(() => {
            let path = '/movie/';
            const url = path + movie_kv[0]
            navigate(url)
            dispatch(setMovie(movie_kv))
        })
        .catch((error) => {
            console.error(error);
        });
}