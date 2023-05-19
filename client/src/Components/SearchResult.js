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
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let searchResult
    const search_kv = useSelector(state => state.search.searchTerm);
    const searchFilter = useSelector(state => state.searchFilter)
    const keys = Object.keys(search_kv);

    keys.forEach(key => {
        searchResult = search_kv[key];
    });

    return (
        <div className="SearchResult">
            <FilterResult />
            <Container>
                {console.log(searchFilter)}
                {searchResult ? (
                    Object.entries(searchResult).map((movie_kv) => {
                        const movie = movie_kv[1];
                        if (
                            (searchFilter?.genreFilter?.length > 0 && 
                                !movie.gen?.some(movieGenre => searchFilter.genreFilter.includes(movieGenre.genre))) ||
                            (searchFilter?.yearFilter?.length === 2 && 
                                (movie.year < searchFilter.yearFilter[0] 
                                    || movie.year > searchFilter.yearFilter[1])) ||
                            (searchFilter?.ratingFilter && 
                                movie.rating < searchFilter.ratingFilter)
                        ) {
                            return null; // Doesn't satisfy the filters
                        }
                        console.log(movie.rating < searchFilter.ratingFilter) 
                        return (
                            <Card className="border-0" key={movie_kv[0]} style={{ width: '62rem' }}>
                                <Row>
                                    <div className='col-sm-5'>
                                        <CardBannerNav movie_kv={movie_kv} dispatch={dispatch} navigate={navigate} />
                                    </div>
                                    <div className='col-sm-7'>
                                        <Card.Body>
                                            <Card.Title>{movie_kv[1].title}</Card.Title>
                                            <Card.Text>{movie_kv[1].plot}</Card.Text>
                                            <Card.Text>
                                                <strong>Genres:</strong> {movie_kv[1].gen.map(genre => genre.genre).join(', ')}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Rating:</strong> {movie_kv[1].rating} / 10
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Content rating:</strong> {movie_kv[1].content_rating}
                                            </Card.Text>
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
                        )
                    })
                ) : (
                    <></>
                )}
            </Container>
        </div >
    )
}