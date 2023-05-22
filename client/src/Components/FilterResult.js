import { Button, Offcanvas, ToggleButton } from 'react-bootstrap'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ResetFilter } from '../Helpers/ResetSlider';
import { GenreSelector } from './GenreSelector';
import { SliderFilter } from './SliderFilter';

export function FilterResult() {

    const filterIcon = "/static/images/filterIcon.png"
    const containerStyle = { marginBottom: '20px' }
    const dispatch = useDispatch()
    const [showComponent, setShowComponent] = useState(false);

    const toggleComponent = () => {
        setShowComponent(!showComponent);
    };

    return (
        <div className="FilterResult" style={{
            position: 'sticky',
            top: '0',
            zIndex: '999',
        }}>
            <ToggleButton
                style={{ position: 'absolute', right: '0' }}
                variant='none'
                onClick={toggleComponent}>
                <img
                    src={filterIcon}
                    width="70"
                    height="70"
                    className="filter-icon"
                    alt={"Filter Icon"}
                />
            </ToggleButton>
            <Offcanvas show={showComponent} onHide={toggleComponent} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Button variant="dark"
                        onClick={() => ResetFilter(dispatch)}
                        style={{ marginBottom: '20px' }}>
                        Reset filters
                    </Button>
                    <SliderFilter dispatch={dispatch}
                        containerStyle={containerStyle}
                        type='releaseYear' />
                    <SliderFilter dispatch={dispatch}
                        containerStyle={containerStyle}
                        type='rating' />
                    <GenreSelector dispatch={dispatch}
                        containerStyle={containerStyle} />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

