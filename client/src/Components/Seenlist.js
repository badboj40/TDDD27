import { useNavigate } from 'react-router-dom'
import { Card, Col, Container, Nav, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { WatchListToggleButton } from './WatchlistToggleButton';
import { SeenListToggleButton } from './SeenlistToggleButton';
import { HandleMoviePage } from '../Helpers/HandleMoviePage';


export function SeenListPage() {
    const seenlistState = useSelector(state => state.seenlist)['seenlist']

    const notFoundLogo = "/static/images/unknown-file-icon.png"

    const cardWidth = '20rem'

    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="Seenlist">
            <Container className='grid'>
                <Row md={8} className="gy-5">
                    {seenlistState ? (
                        Object.entries(seenlistState).map((key_value) => (
                            <Col md={4} key={key_value[0]}>
                                <Card style={{ width: cardWidth }}>
                                    <Container style={{ postition: 'relative', padding: 0 }}>
                                        <WatchListToggleButton movie_kv={key_value} dispatch={dispatch} style={{
                                            position: 'absolute', borderWidth: '2px',
                                            borderColor: 'black', opacity: '0.9', fontWeight: 'bold'
                                        }} />
                                        <SeenListToggleButton movie_kv={key_value} dispatch={dispatch} style={{
                                            position: 'absolute', right: '0', borderWidth: '2px',
                                            borderColor: 'black', opacity: '0.9', fontWeight: 'bold'
                                        }} />
                                        <Nav>
                                            <Nav.Link onClick={() => HandleMoviePage(key_value, navigate, dispatch)} style={{ padding: 0 }}>
                                                <Card.Img variant="top"
                                                    src={key_value[1].banner}
                                                    onError={(e) => { e.target.src = notFoundLogo }} />

                                            </Nav.Link>
                                        </Nav>
                                    </Container>
                                    <div className=''>
                                        <Card.Body>
                                            <Card.Title className=''
                                                style={{ fontSize: '20px' }}>
                                                {key_value[1].title}
                                            </Card.Title>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <h2>No movies in your watchlist.</h2>
                    )}
                </Row>
            </Container>
        </div >
    )
}