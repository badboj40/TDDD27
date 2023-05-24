import 'bootstrap/dist/css/bootstrap.min.css';

import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useState } from 'react';
import { setHomeMovies } from '../store';
import { GetHomeMovies } from '../Helpers/GetData';
import { LoadingSpinner } from './LoadingSpinner';

export function HomePagination(props) {
    const dispatch = props.dispatch;
    const count = props.count;
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    return (
        <div className='d-flex flex-column align-items-center' style={{paddingBottom: '50px'}}>
            <LoadingSpinner
                isLoading={isLoading}
                animation="grow"
                size="lg"
                variant="dark"
                style={{margin: '0 auto'}} />
            <PaginationControl
                page={page}
                between={4}
                total={count}
                limit={10}
                changePage={async (page) => {
                    setIsLoading(true)
                    setPage(page);
                    await GetHomeMovies(page, dispatch)
                        .then((result) => {
                            setIsLoading(false)
                            dispatch(setHomeMovies(result));
                        });
                }}
                ellipsis={1}
            />
        </div>

    )
}