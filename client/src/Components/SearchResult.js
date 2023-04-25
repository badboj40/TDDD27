import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { Card, Container, OverlayTrigger, ToggleButton, Tooltip } from 'react-bootstrap'
import { addWatchlistItem, removeWatchlistItem } from '../store';
import axios from 'axios';


export function SearchResultPage(props) {
    const isSignedIn = props.isSignedIn;
    const { searchTerm } = useParams();
    const searchResult = useSelector(state => state.search.searchTerm);
    const [checked, setChecked] = useState(Array(searchResult.length).fill(false));
    const dispatch = useDispatch();

    const notFoundLogo = "/static/images/unknown-file-icon.png"

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

    const addToWatchlist = async (movieId) => {
        console.log("add", movieId)
        
        await axios.post('http://' + window.location.host + '/updateWatchlist')
        .then((result) => {
                console.log(result);
                dispatch(addWatchlistItem(movieId));
            })
        .catch((error) => {
            console.error(error);
        })
    };

    const removeFromWatchlist = async (movieId) => {
        console.log("remove", movieId)

        await axios.delete('http://' + window.location.host + '/updateWatchlist')
        .then((result) => {
                console.log(result);
                dispatch(removeWatchlistItem(movieId))
            })
        .catch((error) => {
            console.error(error);
        })
    };

    return (
        <div className="SearchResult">
            <Container className=''>
                {searchResult ? (
                    searchResult.map((item, index) => (
                        <Card className="" key={index} style={{ width: '62rem' }}>
                            <div className='row'>
                                <div className='col-sm-5'>
                                    <Card.Img variant="top"
                                        src={item.results.banner} onError={(e) => { e.target.src = notFoundLogo }} />
                                </div>
                                <div className='col-sm-7'>
                                    <Card.Body>
                                        <Card.Title>{item.results.title}</Card.Title>
                                        <Card.Text>{item.results.plot}</Card.Text>
                                        <Card.Text>{item.results.movie_length}min</Card.Text>
                                        {isSignedIn === true ?
                                            <OverlayTrigger
                                                placement="right"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltip(checked[index])}
                                            >
                                                <ToggleButton
                                                    id={index}
                                                    type="checkbox"
                                                    variant="success"
                                                    checked={checked[index]}
                                                    value={index}
                                                    onChange={(e) => {
                                                        const newChecked = [...checked];
                                                        newChecked[index] = e.currentTarget.checked;
                                                        setChecked(newChecked);
                                                        checked[index] ? removeFromWatchlist(item.results.imdb_id) : addToWatchlist(item.results.imdb_id);
                                                    }}
                                                >
                                                    {checked[index] ? 'x' : '+'}
                                                </ToggleButton>
                                            </OverlayTrigger>
                                            :
                                            <></>
                                        }

                                    </Card.Body>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </Container>
        </div >
    )
}