import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { Card, Container, OverlayTrigger, ToggleButton, Tooltip } from 'react-bootstrap'

export function SearchResultPage() {
    console.log("Load 'SearchResult' page");
    const { searchTerm } = useParams();
    const searchResult = useSelector(state => state.searchTerm);
    const [checked, setChecked] = useState(Array(searchResult.length).fill(false));


    const renderTooltip = (index) => {
        if (index) {
            return (
                <Tooltip id="button-tooltip">
                    Remove from my watchlist
                </Tooltip>
            );
        } else {
            return (
                <Tooltip id="button-tooltip">
                    Add to my watchlist
                </Tooltip>
            );
        }
    };

    return (
        <div className="SearchResult">
            <Container className="d-flex flex-wrap justify-content-around">
                {searchResult ? (
                    searchResult.map((item, index) => (
                        <Card key={index} style={{ width: '15rem' }}>
                            <Card.Img variant="top" src={item.results.banner} />
                            <Card.Body>
                                <Card.Title>{item.results.title}</Card.Title>
                                <Card.Text>{item.results.plot}</Card.Text>
                                <Card.Text>Movie length: {item.results.movie_length}</Card.Text>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip(checked[index])}
                                >
                                    <ToggleButton
                                        id={index}
                                        type="checkbox"
                                        variant="secondary"
                                        checked={checked[index]}
                                        value={index}
                                        onChange={(e) => {
                                            const newChecked = [...checked];
                                            newChecked[index] = e.currentTarget.checked;
                                            setChecked(newChecked);
                                        }}
                                    >
                                        {checked[index] ? '-' : '+'}
                                    </ToggleButton>
                                </OverlayTrigger>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </Container>
        </div>
    )
}