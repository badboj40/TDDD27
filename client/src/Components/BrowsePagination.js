import 'bootstrap/dist/css/bootstrap.min.css';

import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { setMoviesByGenre } from '../store';
import { GetMoviesByGenre } from '../Helpers/GetData';
import { LoadingSpinner } from './LoadingSpinner';

export function BrowsePagination(props) {
    const dispatch = props.dispatch;
    const [isLoading, setIsLoading] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null)
    const [page, setPage] = useState(1);
    const { genre } = useParams();

    return (
        <div className='d-flex flex-column align-items-center' >
            <LoadingSpinner
                isLoading={isLoading}
                animation="grow"
                size="lg"
                variant="dark"
                style={{margin: '0 auto'}} />
            <PaginationControl
                page={page}
                between={4}
                total={250}
                limit={20}
                changePage={async (page) => {
                    setIsLoading(true)
                    setPage(page);
                    await GetMoviesByGenre(genre, page, dispatch)
                        .then((result) => {
                            setIsLoading(false)
                            dispatch(setMoviesByGenre(result));
                        });
                }}
                ellipsis={1}
            />
        </div>

    )
}