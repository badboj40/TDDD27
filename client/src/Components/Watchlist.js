import { useNavigate } from 'react-router-dom'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { WatchListToggleButton } from './WatchlistToggleButton';
import { SeenListToggleButton } from './SeenlistToggleButton';
import { CardBannerNav } from './CardBannerNav';


export function WatchListPage() {
    const watchlistState = useSelector(state => state.watchlist)['watchlist']
    const cardWidth = '20rem'
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="WatchList" style={{ backgroundColor: '#FFFFFF' }}>
            <Container className='grid'>
                <Row md={8} className="gy-5">
                    {watchlistState && Object.keys(watchlistState).length > 0 ? (
                        Object.entries(watchlistState).map((movie_kv) => (
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
                                        <CardBannerNav movie_kv={movie_kv} dispatch={dispatch} navigate={navigate} loadingStyle='list' />
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