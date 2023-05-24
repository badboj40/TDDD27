import 'bootstrap/dist/css/bootstrap.min.css';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { setHomeMovies, setMoviesByGenre } from '../store';
import { GetHomeMovies, GetMoviesByGenre } from '../Helpers/GetData';
import { LoadingSpinner } from './LoadingSpinner';

export function Pagination(props) {
    const dispatch = props.dispatch;
    const count = props.count;
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const { genre } = useParams();

    const fetchData = async (page) => {
        setIsLoading(true);
        setPage(page);

        let result;
        if (props.type === 'home') {
            result = await GetHomeMovies(page, dispatch);
            dispatch(setHomeMovies(result));
        } else if (props.type === 'browse') {
            result = await GetMoviesByGenre(genre, page, dispatch);
            dispatch(setMoviesByGenre(result));
        }

        setIsLoading(false);
    };

    return (
        <div className='d-flex flex-column align-items-center' style={{ paddingBottom: '50px' }}>
            <LoadingSpinner
                isLoading={isLoading}
                animation="grow"
                size="lg"
                variant="dark"
                style={{ margin: '0 auto' }}
            />
            <PaginationControl
                page={page}
                between={4}
                total={count}
                limit={10}
                changePage={fetchData}
                ellipsis={1}
            />
        </div>
    );
}
