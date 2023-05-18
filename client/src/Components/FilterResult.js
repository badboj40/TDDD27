import { Button, Col, Container, Offcanvas, Row, ToggleButton } from 'react-bootstrap'
import ReactSlider from 'react-slider';
import './Slider.css'
import { useState } from 'react';
import { RenderToggleButtonElement } from '../Helpers/RenderToggleButtonElement';
import { useDispatch, useSelector } from 'react-redux';
import { addToGenreFilter, clearSearchFilter, removeFromGenreFilter, setYearFilter } from '../store';

export function FilterResult() {

    const filterIcon = "/static/images/filterIcon.png"
    const containerStyle = { marginBottom: '20px' }
    const dispatch = useDispatch()
    const genreFilterState = useSelector(state => state.searchFilter.genreFilter)
    const yearFilterState = useSelector(state => state.searchFilter.yearFilter)
    const [showComponent, setShowComponent] = useState(false);
    const [sliderKey, setSliderKey] = useState(Date.now());
    const genres = JSON.parse(sessionStorage.getItem("movieGenres"))

    const toggleComponent = () => {
        setShowComponent(!showComponent);
    };

    const resetFilter = () => {
        console.log("RESET FILTERS")
        console.log(yearFilterState)
        dispatch(clearSearchFilter())
        setSliderKey(Date.now());
    }

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
                            key={sliderKey}
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            defaultValue={yearFilterState}
                            min={1950}
                            max={2023}
                            ariaLabel={['Lower thumb', 'Upper thumb']}
                            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                            pearling
                            minDistance={1}
                            onAfterChange={(values) => {
                                dispatch(setYearFilter(values))
                            }}
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
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

