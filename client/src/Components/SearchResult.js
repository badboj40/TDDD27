import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, Container } from 'react-bootstrap'

export function SearchResultPage() {
    console.log("Load 'SearchResult' page");
    const { searchTerm } = useParams();
    const searchResult = useSelector(state => state.searchTerm);

    console.log(searchResult)

    return (
        <div className="SearchResult">
            <Container className="d-flex flex-wrap justify-content-around">
                {searchResult ? (
                    searchResult.map((item, index) => (
                        <Card key={index} style={{ width: '15rem' }}>
                            <Card.Img variant="top" src={item.results.banner} />
                            <Card.Body>
                                <Card.Title>{item.results.title}</Card.Title>
                                <Card.Text>{item.results.plot}</Card.Text>
                                <Card.Text>Movie length: {item.results.movie_length}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </Container>
        </div>
    )
}