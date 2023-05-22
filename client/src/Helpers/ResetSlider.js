import { clearSearchFilter, setSlider } from "../store"


export const ResetFilter = (dispatch) => {
    dispatch(clearSearchFilter())
    dispatch(setSlider(Date.now()))
}