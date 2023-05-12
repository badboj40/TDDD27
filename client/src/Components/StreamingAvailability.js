import { useNavigate } from 'react-router-dom'
import { Button, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

// WIP
export function StreamingAvailabilityGroup(props) {
    const style = props.style
    const movie_kv = props.movie_kv
    const availableStreamingServices = useSelector(state => state.streamingService)
    const watchlistState = useSelector(state => state.watchlist)['watchlist']


    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="StreamingAvailability">
            <Container className='grid gap-2 p-0'>
                <Row md={5} className="mx-auto">
                    {/* TODO: Change this to: "for every supported streaming site for the movie" loop */}
                    {watchlistState ? (
                        Object.entries(watchlistState).map((movie_kv) => (
                            <Button className={movie_kv[0]} variant="secondary" size="lg" style={style}>
                                {movie_kv[1].title[0]}
                            </Button>
                        ))
                    ) : (
                        <h2>No movies in your watchlist.</h2>
                    )}
                </Row>
            </Container>
        </div >

    )
}