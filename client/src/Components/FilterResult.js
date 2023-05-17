import { Button, Col, Container, Offcanvas, Row, ToggleButton } from 'react-bootstrap'
import ReactSlider from 'react-slider';
import './Slider.css'
import { useState } from 'react';
import { RenderToggleButtonElement } from '../Helpers/RenderToggleButtonElement';
import { useDispatch, useSelector } from 'react-redux';
import { addToGenreFilter, removeFromGenreFilter } from '../store';

export function FilterResult() {

    const filterIcon = "/static/images/filterIcon.png"

    const [showComponent, setShowComponent] = useState(false);
    const dispatch = useDispatch()
    const genreFilterState = useSelector(state => state.genreFilter)["genreFilter"]

    const genres = JSON.parse(sessionStorage.getItem("movieGenres"))

    const toggleComponent = () => {
        setShowComponent(!showComponent);
    };


    const applyFilter = () => {
        console.log("APPLY FILTERS")
    }

    const resetFilter = () => {
        console.log("RESET FILTERS")
    }

    const containerStyle = { marginBottom: '20px' }

    return (
        <div className="FilterResult">
            <ToggleButton
                style={{ position: 'relative' }}
                variant='none'
                onClick={toggleComponent}>
                <img
                    src={filterIcon}
                    width="45"
                    height="45"
                    className="filter-icon"
                    alt={"Filter Icon"}
                />
            </ToggleButton>
            <Offcanvas show={showComponent} onHide={toggleComponent} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Button variant="dark" onClick={resetFilter} style={{ marginBottom: '20px' }}>
                        Reset filters
                    </Button>
                    <Container style={containerStyle}>
                        <Offcanvas.Title>Release year</Offcanvas.Title>
                        <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            defaultValue={[1950, 2023]}
                            min={1950}
                            max={2023}
                            ariaLabel={['Lower thumb', 'Upper thumb']}
                            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                            pearling
                            minDistance={1}
                        />
                    </Container>
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
                    <Button variant="dark" onClick={applyFilter} style={{ marginTop: '50px' }}>
                        Apply filters
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

