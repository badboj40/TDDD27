import { Card, Col, Container, Nav, OverlayTrigger, Row, ToggleButton, Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux';



export function RenderToggleButtonElement(movie_id, state_dict, disable_content, enable_content) {
    const watchlistState = useSelector(state => state.watchlist)['watchlist']
    const seenlistState = useSelector(state => state.seenlist)['seenlist']

    if (state_dict === 'watchlist') {
        if (watchlistState.hasOwnProperty(movie_id)) {
            return disable_content
        } else {
            return enable_content
        }
    } else if (state_dict === 'seenlist') {
        if (seenlistState.hasOwnProperty(movie_id)) {
            return disable_content
        } else {
            return enable_content
        }
    }
    return null
};