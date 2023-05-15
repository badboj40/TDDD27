import { Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux';

export const RenderSeenlistTooltip = (movie_id) => {
    const seenlistState = useSelector(state => state.seenlist)['seenlist']

    if (seenlistState.hasOwnProperty(movie_id)) { // change this condition
        return (
            <Tooltip id="button-tooltip">
                Mark as unseen
            </Tooltip>
        );
    } else {
        return (
            <Tooltip id="button-tooltip">
                Mark as seen
            </Tooltip>
        );
    }
};