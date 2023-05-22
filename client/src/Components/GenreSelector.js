

import { useSelector } from "react-redux"
import './Login.css'
import { RenderToggleButtonElement } from "../Helpers/RenderToggleButtonElement"
import { addToGenreFilter, removeFromGenreFilter } from "../store"
import { Col, Container, Offcanvas, Row, ToggleButton } from "react-bootstrap"

export function GenreSelector(props){
    const dispatch = props.dispatch
    const containerStyle = props.containerStyle
    const genreFilterState = useSelector(state => state.searchFilter.genreFilter)
    const genres = JSON.parse(sessionStorage.getItem("movieGenres"))

    return (
        <Container className='grid' style={containerStyle}>
            <Offcanvas.Title>Genres</Offcanvas.Title>
            <Row md={1} className="gy-1">
                {genres && genres.map((genre, idx) => {
                    return (
                        <Col md={4} key={idx}>
                            <ToggleButton
                                variant={RenderToggleButtonElement(genre, 'genreFilter', 'dark', 'light')}
                                size="sm"
                                value={genre}
                                checked={genreFilterState.includes(genre)}
                                onClick={() => {
                                    if (genreFilterState.includes(genre)) {
                                        dispatch(removeFromGenreFilter(genre))
                                    } else {
                                        dispatch(addToGenreFilter(genre))
                                    }
                                }}
                            >
                                {genre}
                            </ToggleButton>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}