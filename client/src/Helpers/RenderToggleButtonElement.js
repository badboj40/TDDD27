import { useSelector } from 'react-redux';
import { LoadingSpinner } from '../Components/LoadingSpinner';


export function RenderToggleButtonElement(item, state_dict, disable_content, enable_content, variant, isLoading) {
    const watchlistState = useSelector(state => state.watchlist.watchlist)
    const seenlistState = useSelector(state => state.seenlist.seenlist)
    const genreFilterState = useSelector(state => state.searchFilter.genreFilter)

    if(isLoading){
        return <LoadingSpinner isLoading={isLoading} size="sm" variant={variant}/>
    }
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