import { useNavigate } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { HandleGenreClick } from '../Helpers/HandleGenreClick';


export function BrowsePage() {
    const genres = useSelector(state => state.movieGenres.movieGenres)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="Browse" style={{ backgroundColor: '#FFFFFF' }}>
            <Container className='grid'>
                <Row md={1} className="gy-5">
                    {genres ? (
                        Object.entries(genres).map((genre_kv) => (
                            <Col md={4} key={genre_kv}>
                                <Button variant='outline-primary' size='lg'
                                    onClick={() => HandleGenreClick(genre_kv, dispatch, navigate)}>
                                    {genre_kv[1]}
                                </Button>
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