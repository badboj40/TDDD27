import { OverlayTrigger, ToggleButton } from 'react-bootstrap'
import { RenderToggleButtonElement } from '../Helpers/RenderToggleButtonElement'
import { RenderWatchlistTooltip } from '../Helpers/RenderWatchlistTooltip'
import { useSelector } from 'react-redux'
import { AddToWatchlist, RemoveFromWatchlist } from '../Helpers/HandleListItem'
import { useState } from 'react'


export function WatchListToggleButton(props) {
    const movie_kv = props.movie_kv
    const dispatch = props.dispatch
    const style = props.style
    const watchlistState = useSelector(state => state.watchlist)['watchlist']
    const [isLoading, setIsLoading] = useState(false);

    return (
        <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={RenderWatchlistTooltip(movie_kv[1].imdb_id)}
        >
            <ToggleButton
                id={movie_kv[0]}
                type="checkbox"
                variant={RenderToggleButtonElement(movie_kv[0], 'watchlist', 'danger', 'success')}
                value={movie_kv[0]}
                checked={watchlistState.hasOwnProperty(movie_kv[0])}
                disabled={isLoading}
                onClick={() => {
                    setIsLoading(true);
                    if (watchlistState.hasOwnProperty(movie_kv[0])) {
                        RemoveFromWatchlist(movie_kv[0], dispatch)
                            .then(() => {
                                setIsLoading(false);
                            })
                    } else {
                        AddToWatchlist(movie_kv, dispatch)
                            .then(() => {
                                setIsLoading(false);
                            })
                    }
                }}
                style={style}
            >
                {RenderToggleButtonElement(movie_kv[0], 'watchlist', '\u2A2F', '+', 'dark', isLoading)}
            </ToggleButton>
        </OverlayTrigger >
    )
}