import { GetMoviesByGenre, GetStreamingService } from "./GetData";

export const HandleItemClick = async (item_kv, dispatch, navigate, itemType) => {
    let path = '';

    if (itemType === 'movie') {
        await GetStreamingService(item_kv, dispatch);
        path = '/movie/';
    } else if (itemType === 'genre') {
        await GetMoviesByGenre(item_kv, dispatch);
        path = '/browse/';
    }

    const url = path + item_kv[1];
    navigate(url);
};
