import { Button, Offcanvas, ToggleButton } from 'react-bootstrap'
import ReactSlider from 'react-slider';
import './Slider.css'
import { useState } from 'react';

export function FilterResult() {

    const filterIcon = "/static/images/filterIcon.png"

    const [showComponent, setShowComponent] = useState(false);

    const toggleComponent = () => {
        setShowComponent(!showComponent);
    };

    const applyFilter = () => {
        console.log("APPLY FILTERS")
    }

    return (
        <div className="Login">
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
            {showComponent && (
                <Offcanvas show={showComponent} onHide={toggleComponent}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Filter</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
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
                        
                        <Button variant="primary" onClick={applyFilter}>
                            Reset filters
                        </Button>
                    </Offcanvas.Body>
                </Offcanvas>
            )}
        </div>
    )
}

