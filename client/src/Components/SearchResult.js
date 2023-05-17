import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { WatchListToggleButton } from './WatchlistToggleButton';
import { SeenListToggleButton } from './SeenlistToggleButton';
import { CardBannerNav } from './CardBannerNav';
import { FilterResult } from './FilterResult';


export function SearchResultPage(props) {
    const isSignedIn = props.isSignedIn;
    let searchResult = useSelector(state => state.search.searchTerm);
    const keys = Object.keys(searchResult);

    keys.forEach(key => {
        searchResult = searchResult[key];
        console.log(`Key: ${key}, Value: ${searchResult}`);
    });
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="SearchResult">
            <FilterResult />
            {console.log(searchResult)}
            <Container>
                {searchResult ? (
                    Object.entries(searchResult).map((movie_kv) => (
                        <Card className="border-0" key={movie_kv[0]} style={{ width: '62rem', }}>
                            <Row>
                                <div className='col-sm-5'>
                                    <CardBannerNav movie_kv={movie_kv} dispatch={dispatch} navigate={navigate} />
                                </div>
                                <div className='col-sm-7'>
                                    <Card.Body>
                                        <Card.Title>{movie_kv[1].title}</Card.Title>
                                        <Card.Text>{movie_kv[1].plot}</Card.Text>
                                        {movie_kv[1].gen && movie_kv[1].gen.length > 0 && (
                                            <Card.Text>
                                                <strong>Genres:</strong> {movie_kv[1].gen.map(genre => genre.genre).join(', ')}
                                            </Card.Text>
                                        )}
                                        <Card.Text>{movie_kv[1].movie_length}min</Card.Text>
                                        {isSignedIn === true ?
                                            <Container style={{ postition: 'relative', padding: 0 }}>
                                                <WatchListToggleButton movie_kv={movie_kv} dispatch={dispatch} style={{
                                                    borderWidth: '2px', borderColor: 'black',
                                                    opacity: '0.9', fontWeight: 'bold'
                                                }} />
                                                <SeenListToggleButton movie_kv={movie_kv} dispatch={dispatch} style={{
                                                    borderWidth: '2px', borderColor: 'black',
                                                    opacity: '0.9', fontWeight: 'bold'
                                                }} />
                                            </Container>
                                            :
                                            <h1>Something went wrong loading "add to watchlist/seenlist"</h1>
                                        }
                                    </Card.Body>
                                </div>
                            </Row>
                        </Card>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </Container>
        </div >
    )
}