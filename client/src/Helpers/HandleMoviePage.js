import { setMovie } from "../store";

export const HandleMoviePage = (movie, navigate, dispatch) => {
    let path = '/movie/';
    const url = path + movie[0]
    navigate(url)
    dispatch(setMovie(movie))
};