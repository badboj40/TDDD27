import { useDispatch, useSelector } from 'react-redux';
import { Card, Container, ProgressBar, Row } from 'react-bootstrap'

import { WatchListToggleButton } from './WatchlistToggleButton';
import { SeenListToggleButton } from './SeenlistToggleButton';
import { StreamingAvailabilityGroup } from './StreamingAvailability';
import { useNavigate } from 'react-router-dom';


export function MoviePage(props) {
    const isSignedIn = props.isSignedIn;
    const movie_kv = useSelector(state => state.movie.movie);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const notFoundLogo = "/static/images/unknown-file-icon.png"

    return (
        <div className="MoviePage" style={{ marginBottom: '1rem' }}>
            <div className='MoviePage-Background' style={{
                backgroundImage: `url(${movie_kv[1].banner})`,
                backgroundSize: 'cover',
                filter: 'blur(5px)',
                position: 'absolute',
                zIndex: '-1',
                width: '100%',
                height: '100%',
                transform: 'translateY(-100px) scale(1.1)'
            }}>
            </div>
            <Container className='grid' style={{ position: 'relative' }}>
                <Card style={{ width: '62rem', backgroundColor: '#1d1f1d', color: '#FFFFFF' }}>
                    <Row>
                        <div className='col-sm-5'>
                            <Card.Img variant="top"
                                src={movie_kv[1].banner}
                                onError={(e) => { e.target.src = notFoundLogo }} />
                        </div>
                        <div className='col-sm-7'>
                            <Card.Body style={{ textAlign: 'center' }}>
                                <Card.Title style={{ fontSize: '30px' }}>
                                    {movie_kv[1].title}
                                </Card.Title>
                                <Card.Text>{movie_kv[1].plot}</Card.Text>
                                <Card.Text>{movie_kv[1].description}</Card.Text>
                                {isSignedIn === true ?
                                    <Container style={{ postition: 'relative', padding: 0 }}>
                                        <WatchListToggleButton movie_kv={movie_kv} dispatch={dispatch} style={{
                                            borderWidth: '2px', borderColor: 'black',
                                            opacity: '0.9', fontWeight: 'bold'
                                        }} />
                                        <SeenListToggleButton movie_kv={movie_kv} dispatch={dispatch} style={{
                                            borderWidth: '2px', borderColor: 'black',
                                            opacity: '0.9', fontWeight: 'bold'
                                        }} />
                                        <div className='ratio ratio-16x9 border border-light border-4 rounded m-auto'>
                                            <iframe src={movie_kv[1].trailer} title="Trailer" allowFullScreen></iframe>
                                        </div>
                                        <StreamingAvailabilityGroup movie_kv={movie_kv} navigate={navigate} style={{
                                            borderWidth: '2px', borderColor: 'black',
                                            opacity: '0.9', fontWeight: 'bold', fontSize: '30px'
                                        }} />
                                    </Container>
                                    :
                                    <h1>Something went wrong loading movie"</h1>
                                }
                            </Card.Body>
                        </div>
                    </Row>
                    <Card.Body style={{ textAlign: 'center' }}>
                        <Card.Text className='h3' style={{ textAlign: 'left' }}>Released: {movie_kv[1].release}</Card.Text>
                        <Card.Text className='h3'>Length of movie {movie_kv[1].movie_length}min</Card.Text>
                        <Card.Text className='h3'>
                            Rating
                            <ProgressBar>
                                <ProgressBar
                                    now={movie_kv[1].rating * 10}
                                    label={movie_kv[1].rating * 10 + "%"}
                                    variant='success'
                                    key={1}
                                />
                                <ProgressBar
                                    now={100 - (movie_kv[1].rating * 10)}
                                    label={100 - movie_kv[1].rating * 10 + "%"}
                                    variant="danger"
                                    key={2}
                                />
                            </ProgressBar>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div >
    )
}