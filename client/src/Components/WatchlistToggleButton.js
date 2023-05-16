import { OverlayTrigger, ToggleButton } from 'react-bootstrap'
import { RenderToggleButtonElement } from '../Helpers/RenderToggleButtonElement'
import { RenderWatchlistTooltip } from '../Helpers/RenderWatchlistTooltip'
import { useSelector } from 'react-redux'
import { AddToWatchlist, RemoveFromWatchlist } from '../Helpers/HandleListItem'



export function WatchListToggleButton(props) {
    const movie_kv = props.movie_kv
    const dispatch = props.dispatch
    const style = props.style
    const watchlistState = useSelector(state => state.watchlist)['watchlist']


    return (
        <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={RenderWatchlistTooltip(movie_kv[1].imdb_id)}
        >
            <ToggleButton
                id={movie_kv[0]}
                type="checkbox"
                variant={RenderToggleButtonElement(movie_kv[0], 'watchlist', 'success', 'light')}
                value={movie_kv[0]}
                checked={watchlistState.hasOwnProperty(movie_kv[0])}
                onClick={async () => {
                    if (watchlistState.hasOwnProperty(movie_kv[0])) {
                        RemoveFromWatchlist(movie_kv[0], dispatch)
                    } else {
                        AddToWatchlist(movie_kv, dispatch)
                    }
                }}
                style={style}
            >
                {RenderToggleButtonElement(movie_kv[0], 'watchlist', 'x', '+')}
            </ToggleButton>
        </OverlayTrigger>
    )
}