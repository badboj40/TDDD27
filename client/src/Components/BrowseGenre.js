import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CardBannerNav } from './CardBannerNav';
import { Pagination } from './Pagination';
import { WatchListToggleButton } from './WatchlistToggleButton';
import { SeenListToggleButton } from './SeenlistToggleButton';

export function BrowseGenrePage() {
    const moviesByGenreState = useSelector(state => state.setMoviesByGenre.moviesByGenre);
    const movies = moviesByGenreState.result;
    const count = moviesByGenreState.count;
    const cardWidth = '20rem';
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="BrowseGenre" style={{ backgroundColor: '#FFFFFF' }}>
            <Container className='grid'>
                {Object.keys(movies).length === 0 ? (
                    <h3>No movies found in this genre.</h3>
                ) : (
                    <Row md={4} className="gy-1">
                        {Object.entries(movies).map((movie_kv) => (
                            <Col md={4} key={movie_kv[0]}>
                                <Card className='border-0' style={{ width: cardWidth }}>
                                    <CardBannerNav movie_kv={movie_kv} dispatch={dispatch} navigate={navigate} loadingStyle='list'/>
                                    <WatchListToggleButton movie_kv={movie_kv} dispatch={dispatch} style={{
                                        position: 'absolute', borderWidth: '2px',
                                        borderColor: 'black', opacity: '0.9', fontWeight: 'bold'
                                    }} />
                                    <SeenListToggleButton movie_kv={movie_kv} dispatch={dispatch} style={{
                                        position: 'absolute', right: '0', borderWidth: '2px',
                                        borderColor: 'black', opacity: '0.9', fontWeight: 'bold'
                                    }} />
                                    <div className=''>
                                        <Card.Body>
                                            <Card.Title className=''
                                                style={{ fontSize: '20px' }}>
                                                {movie_kv[1].title}
                                            </Card.Title>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
            <Pagination type="browse" dispatch={dispatch} count={count} />
        </div>
    );
}
