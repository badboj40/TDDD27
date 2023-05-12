import { Button, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';

// WIP
export function StreamingAvailabilityGroup(props) {
    const style = props.style
    const movie_kv = props.movie_kv
    const availableStreamingServices = useSelector(state => state.streamingService)["streamingService"]

    return (
        <div className="StreamingAvailability">
            <Container className='grid'>
                <Row md={6} className="gx-5">
                    {availableStreamingServices && Object.entries(availableStreamingServices[movie_kv[0]]["services"])?.map((service_kv, index) => {
                            return (
                                <Button className={service_kv[0] + movie_kv[0]}
                                    variant="secondary"
                                    size="lg"
                                    style={style}
                                    onClick={() =>
                                        window.open(service_kv[1][0].link, '_blank', 'rel=noopener noreferrer')
                                    }>
                                    {service_kv[0]}
                                </Button>
                            )
                        })}
                </Row>
            </Container>
        </div>
    )
}
