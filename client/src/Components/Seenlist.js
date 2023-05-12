import { useNavigate } from 'react-router-dom'
import { Card, Col, Container, Nav, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { WatchListToggleButton } from './WatchlistToggleButton';
import { SeenListToggleButton } from './SeenlistToggleButton';
import { HandleMovieClick } from '../Helpers/HandleMovieClick';



export function SeenListPage() {
    const seenlistState = useSelector(state => state.seenlist)['seenlist']

    const notFoundLogo = "/static/images/unknown-file-icon.png"

    const cardWidth = '20rem'

    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="Seenlist" style={{}}>
            <Container className='grid'>
                <Row md={8} className="gy-5">
                    {seenlistState ? (
                        Object.entries(seenlistState).map((movie_kv) => (
                            <Col md={4} key={movie_kv[0]}>
                                <Card className='border-0' style={{ width: cardWidth }}>
                                    <Container style={{ postition: 'relative', padding: 0 }}>
                                        <WatchListToggleButton movie_kv={movie_kv} dispatch={dispatch} style={{
                                            position: 'absolute', borderWidth: '2px',
                                            borderColor: 'black', opacity: '0.9', fontWeight: 'bold'
                                        }} />
                                        <SeenListToggleButton movie_kv={movie_kv} dispatch={dispatch} style={{
                                            position: 'absolute', right: '0', borderWidth: '2px',
                                            borderColor: 'black', opacity: '0.9', fontWeight: 'bold'
                                        }} />
                                        <Nav>
                                            <Nav.Link onClick={async () => { HandleMovieClick(movie_kv, dispatch, navigate) }}>
                                                <Card.Img variant="top"
                                                    src={movie_kv[1].banner}
                                                    onError={(e) => { e.target.src = notFoundLogo }} />

                                            </Nav.Link>
                                        </Nav>
                                    </Container>
                                    <div className=''>
                                        <Card.Body style={{ textAlign: 'center' }}>
                                            <Card.Title className=''
                                                style={{ fontSize: '20px' }}>
                                                {movie_kv[1].title}
                                            </Card.Title>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <h2>No movies in your seenlist.</h2>
                    )}
                </Row>
            </Container>
        </div >
    )
}