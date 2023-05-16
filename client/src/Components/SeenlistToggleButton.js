import { OverlayTrigger, ToggleButton } from 'react-bootstrap'
import { RenderToggleButtonElement } from '../Helpers/RenderToggleButtonElement'
import { RenderSeenlistTooltip } from '../Helpers/RenderSeenlistTooltip'
import { useSelector } from 'react-redux'
import { AddToSeenlist, RemoveFromSeenlist, RemoveFromWatchlist } from '../Helpers/HandleListItem'


export function SeenListToggleButton(props) {
    const dispatch = props.dispatch
    const movie_kv = props.movie_kv
    const style = props.style
    const checkMarkLogo = "/static/images/check_mark.png"

    const seenlistState = useSelector(state => state.seenlist)['seenlist']

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
                variant="dark"
                value={movie_kv[0]}
                checked={seenlistState.hasOwnProperty(movie_kv[0])}
                onClick={async () => {
                    if (seenlistState.hasOwnProperty(movie_kv[0])) {
                        RemoveFromSeenlist(movie_kv[0], dispatch)
                    } else {
                        AddToSeenlist(movie_kv, dispatch)
                        RemoveFromWatchlist(movie_kv[0], dispatch)
                    }
                }}
                style={style}
            >
                <img
                    src={checkMarkLogo}
                    width="15"
                    height="15"
                    className=""
                    alt="checkmark"
                    style={RenderToggleButtonElement(movie_kv[0], 'seenlist', { filter: 'grayscale(0%)' }, { filter: 'grayscale(100%)' })}
                />
            </ToggleButton>
        </OverlayTrigger>
    )
}