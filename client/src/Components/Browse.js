import { useNavigate } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { HandleItemClick } from '../Helpers/HandleItemClick';
import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';


export function BrowsePage() {
    const genres = useSelector(state => state.movieGenres.movieGenres)
    const [isLoading, setIsLoading] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="Browse" style={{ backgroundColor: '#FFFFFF' }}>
            <Container className='grid'>
                <Row md={1} className="gy-5">
                    {genres ? (
                        Object.entries(genres).map((genre_kv) => (
                            <Col className='d-flex' md={4} key={genre_kv}>

                                <Button variant='dark' size='lg'
                                    onClick={() => {
                                        setIsLoading(true);
                                        setSelectedButton(genre_kv[0])
                                        HandleItemClick(genre_kv, dispatch, navigate, 'genre')
                                            .then(() => {
                                                setIsLoading(false);
                                            });
                                    }}
                                >
                                    {selectedButton == genre_kv[0] ?
                                        <LoadingSpinner
                                            isLoading={isLoading}
                                            animation="grow"
                                            size="lg"
                                            variant="dark"
                                            style={{ position: 'relative' }} />
                                        :
                                        <>
                                            {genre_kv[1]}
                                        </>}

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