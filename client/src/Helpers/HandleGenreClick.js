import { setGenre } from "../store";
import { GetMoviesByGenre } from "./GetMoviesByGenre";


export const HandleGenreClick = async (genre_kv, dispatch, navigate) => {
    await GetMoviesByGenre(genre_kv, dispatch)
        .then(() => {
            let path = '/browse/';
            const url = path + genre_kv[1]
            navigate(url)
        })
        .catch((error) => {
            console.error(error);
        });
}