import { useNavigate } from 'react-router-dom'
import { Card, Col, Container, Nav, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { CardBannerNav } from './CardBannerNav';
import { WatchListToggleButton } from './WatchlistToggleButton';
import { SeenListToggleButton } from './SeenlistToggleButton';
import { LoadingSpinner } from './LoadingSpinner';
import { signInWithGoogle } from '../Firebase/Firebase';
import { Pagination } from './Pagination';


export function HomePage(props) {
    const isSignedIn = props.isSignedIn;
    const cardWidth = '20rem'
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let count = 50;
    let movies;
    const homeMovies = useSelector(state => state.homeMovies.homeMovies)
    if (homeMovies !== null) {
        // Weird API bug where getting some pages failed. Count therefore hardcoded to 50 (one page)
        //count = homeMovies.count;
        movies = homeMovies.result;
    }

    return (
        <div className="Home" style={{ backgroundColor: '#FFFFFF', textAlign: 'center' }}>
            <h2>Welcome back, here are some recommended movies for you to watch</h2>
            <Container className='grid'>
                <Row md={8} className="gy-5">
                    {movies && Object.entries(movies).length > 0 ? (
                        Object.entries(movies).map((movie_kv) => (
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
                        isSignedIn ? (
                            <LoadingSpinner
                                isLoading={true}
                                animation="border"
                                size="lg"
                                variant="dark"
                                style={{ position: 'relative' }}
                            />
                        ) : (
                            <button className="login-with-google-btn" onClick={() => signInWithGoogle(dispatch)}>
                                Sign in with Google
                            </button>
                        )
                    )}
                </Row>
            </Container>
            <Pagination type="home" dispatch={dispatch} count={count} />
        </div >
    )
}