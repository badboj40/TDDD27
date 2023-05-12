import { setMovie } from "../store";
import { GetStreamingService } from "./GetStreamingService";
import { HandleMoviePage } from "./HandleMoviePage";


export const HandleMovieClick = async (movie_kv, dispatch, navigate) => {
    setMovie(movie_kv[1])
    await GetStreamingService(movie_kv, dispatch)
        .then(() => {
            HandleMoviePage(movie_kv, navigate, dispatch);
        })
        .catch((error) => {
            console.error(error);
        });
}