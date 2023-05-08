import { Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux';

export const RenderWatchlistTooltip = (movie_id) => {
    const watchlistState = useSelector(state => state.watchlist)['watchlist']

    if (watchlistState.hasOwnProperty(movie_id)) { // change this condition
        return (
            <Tooltip id="button-tooltip">
                Remove from my watchlist
            </Tooltip>
        );
    } else {
        return (
            <Tooltip id="button-tooltip">
                Add to my watchlist
            </Tooltip>
        );
    }
};