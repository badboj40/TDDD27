import { useNavigate } from 'react-router-dom'
import { Card, Col, Container, Nav, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { CardBannerNav } from './CardBannerNav';
import { WatchListToggleButton } from './WatchlistToggleButton';
import { SeenListToggleButton } from './SeenlistToggleButton';


export function HomePage() {
    const cardWidth = '20rem'
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const homeMovies = useSelector(state => state.homeMovies.homeMovies)

    return (
        <div className="Home" style={{ backgroundColor: '#FFFFFF', textAlign: 'center' }}>
            <h2>Welcome back, here are some recommended movies for you to watch</h2>
            <Container className='grid'>
                <Row md={8} className="gy-5">
                    {homeMovies && Object.entries(homeMovies).length > 0 ? (
                        Object.entries(homeMovies).map((movie_kv) => (
                            <Col md={4} key={movie_kv[0]}>
                                <Card className='border-0' style={{ width: cardWidth }}>
                                    <Container style={{ postition: 'relative', padding: 0 }}>
                                        <Nav>
                                            <CardBannerNav movie_kv={movie_kv} dispatch={dispatch} navigate={navigate} loadingStyle='grid' />
                                            <WatchListToggleButton movie_kv={movie_kv} dispatch={dispatch} style={{
                                                position: 'absolute', borderWidth: '2px',
                                                borderColor: 'black', opacity: '0.9', fontWeight: 'bold'
                                            }} />
                                            <SeenListToggleButton movie_kv={movie_kv} dispatch={dispatch} style={{
                                                position: 'absolute', right: '0', borderWidth: '2px',
                                                borderColor: 'black', opacity: '0.9', fontWeight: 'bold'
                                            }} />
                                        </Nav>
                                    </Container>
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
                        ))
                    ) : (
                        <h2>Could not display home movies, sorry for the inconvenience.</h2>
                    )}
                </Row>
            </Container>
        </div >
    )
}