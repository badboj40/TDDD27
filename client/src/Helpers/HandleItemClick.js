import { GetMoviesByGenre, GetStreamingService } from "./GetData";

export const HandleItemClick = async (item_kv, dispatch, navigate, itemType) => {
    let url = ''

    if (itemType === 'movie') {
        await GetStreamingService(item_kv, dispatch)
        url = `/movie/${item_kv[0]}`
    } else if (itemType === 'genre') {
        await GetMoviesByGenre(item_kv, dispatch);
        url = `/browse/${item_kv[1]}`
    }
    navigate(url);
};
