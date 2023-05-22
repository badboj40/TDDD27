import { useNavigate } from 'react-router-dom'
import { Card, Col, Container, Pagination, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { CardBannerNav } from './CardBannerNav';
import { BrowsePagination } from './BrowsePagination';


export function BrowseGenrePage() {
    const moviesByGenreState = useSelector(state => state.genre.genre);
    const movies = moviesByGenreState.result

    const cardWidth = '20rem'
    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log(moviesByGenreState)

    return (
        <div className="BrowseGenre" style={{ backgroundColor: '#FFFFFF' }}>
            <Container className='grid'>
                <Row md={4} className="gy-1">
                    {movies ? (
                        Object.entries(movies).map((movie_kv) => (
                            <Col md={4} key={movie_kv[0]}>
                                <Card className='border-0' style={{ width: cardWidth }}>
                                    <Container style={{ postition: 'relative', padding: 0 }}>
                                        <CardBannerNav movie_kv={movie_kv} dispatch={dispatch} navigate={navigate} />
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
                        <h2>No movies in this genre.</h2>
                    )}
                </Row>
            </Container>
            <BrowsePagination dispatch={dispatch} />
        </div >
    )
}