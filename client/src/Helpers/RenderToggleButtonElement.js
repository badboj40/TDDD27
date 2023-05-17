import { useSelector } from 'react-redux';


export function RenderToggleButtonElement(item, state_dict, disable_content, enable_content) {
    const watchlistState = useSelector(state => state.watchlist)['watchlist']
    const seenlistState = useSelector(state => state.seenlist)['seenlist']
    const genreFilterState = useSelector(state => state.genreFilter)["genreFilter"]

    if (state_dict === 'watchlist') {
        if (watchlistState.hasOwnProperty(item)) {
            return disable_content
        } else {
            return enable_content
        }
    } else if (state_dict === 'seenlist') {
        if (seenlistState.hasOwnProperty(item)) {
            return disable_content
        } else {
            return enable_content
        }
    } else if (state_dict === 'genreFilter') {
        if (genreFilterState.includes(item)) {
            return disable_content
        } else {
            return enable_content
        }
    }

    return null
};