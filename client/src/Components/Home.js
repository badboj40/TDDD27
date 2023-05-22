import { useNavigate } from 'react-router-dom'
import { Card, Col, Container, Nav, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { CardBannerNav } from './CardBannerNav';


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
                    {homeMovies ? (
                        Object.entries(homeMovies).map((movie_kv) => (
                            <Col md={4} key={movie_kv[0]}>
                                <Card className='border-0' style={{ width: cardWidth }}>
                                    <Container style={{ postition: 'relative', padding: 0 }}>
                                        <Nav>
                                        <CardBannerNav movie_kv={movie_kv} dispatch={dispatch} navigate={navigate} />
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
                        <h2>No movies in your watchlist.</h2>
                    )}
                </Row>
            </Container>
        </div >
    )
}