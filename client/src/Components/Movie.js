import { useDispatch, useSelector } from 'react-redux';
import { Card, Container, Row } from 'react-bootstrap'
import { WatchListToggleButton } from './WatchlistToggleButton';
import { SeenListToggleButton } from './SeenlistToggleButton';


export function MoviePage(props) {
    const isSignedIn = props.isSignedIn;
    const movie_kv = useSelector(state => state.movie.movie);
    const dispatch = useDispatch();

    const notFoundLogo = "/static/images/unknown-file-icon.png"

    return (
        <div className="MoviePage" style={{backgroundColor: '#061706'}}> 
            <Container className='grid'>
                <Card className='border-0' style={{ width: '62rem' }}>
                    <Row>
                        <div className='col-sm-5'>
                            <Card.Img variant="top"
                                src={movie_kv[1].banner}
                                onError={(e) => { e.target.src = notFoundLogo }} />
                        </div>
                        <div className='col-sm-7'>
                            <Card.Body style={{backgroundColor: '#061706', color: '#FFFFFF', textAlign: 'center'}}>
                                <Card.Title>{movie_kv[1].title}</Card.Title>
                                <Card.Text>{movie_kv[1].plot}</Card.Text>
                                <Card.Text>{movie_kv[1].movie_length}min</Card.Text>
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
                                    </Container>
                                    :
                                    <h1>Something went wrong loading "add to watchlist/seenlist"</h1>
                                }
                            </Card.Body>
                        </div>
                    </Row>
                </Card>
            </Container>
        </div >
    )
}