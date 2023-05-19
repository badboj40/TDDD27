import { OverlayTrigger, ToggleButton } from 'react-bootstrap'
import { RenderToggleButtonElement } from '../Helpers/RenderToggleButtonElement'
import { RenderSeenlistTooltip } from '../Helpers/RenderSeenlistTooltip'
import { useSelector } from 'react-redux'
import { AddToSeenlist, RemoveFromSeenlist, RemoveFromWatchlist } from '../Helpers/HandleListItem'
import { useState } from 'react'


export function SeenListToggleButton(props) {
    const dispatch = props.dispatch
    const movie_kv = props.movie_kv
    const style = props.style
    const seenlistState = useSelector(state => state.seenlist)['seenlist']
    const [isLoading, setIsLoading] = useState(false);

    return (
        <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={RenderSeenlistTooltip(movie_kv[1].imdb_id)}
        >
            {/* Seenlist-knappen */}
            <ToggleButton
                id={movie_kv[0]}
                type="checkbox"
                variant={RenderToggleButtonElement(movie_kv[0], 'seenlist', 'success', 'dark')}
                value={movie_kv[0]}
                checked={seenlistState.hasOwnProperty(movie_kv[0])}
                onClick={async () => {

                    setIsLoading(true);
                    if (seenlistState.hasOwnProperty(movie_kv[0])) {
                        RemoveFromSeenlist(movie_kv[0], dispatch)
                            .then(() => {
                                setIsLoading(false);
                            })
                    } else {
                        AddToSeenlist(movie_kv, dispatch)
                            .then(() => {
                                setIsLoading(false);
                            })
                        RemoveFromWatchlist(movie_kv[0], dispatch)
                    }
                }}
                style={style}
            >
                {RenderToggleButtonElement(movie_kv[0], 'seenlist', '\u2713', '\u2713', 'light', isLoading)}
                {/* <img
                    src={checkMarkLogo}
                    width="15"
                    height="15"
                    className=""
                    alt="checkmark"
                    style={RenderToggleButtonElement(movie_kv[0], 'seenlist', { filter: 'grayscale(0%)' }, { filter: 'grayscale(100%)' }, isLoading)}
                /> */}
            </ToggleButton>
        </OverlayTrigger>
    )
}