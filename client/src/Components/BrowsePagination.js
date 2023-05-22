import 'bootstrap/dist/css/bootstrap.min.css';

import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { setMoviesByGenre } from '../store';
import { GetMoviesByGenre } from '../Helpers/GetData';

export function BrowsePagination(props) {
    const dispatch = props.dispatch;
    const [page, setPage] = useState(1);

    const { genre } = useParams();

    return (
        <PaginationControl
            page={page}
            between={4}
            total={250}
            limit={20}
            changePage={async (page) => {
                setPage(page);

                const movies = await GetMoviesByGenre(genre, page, dispatch);
                console.log('page:',page, 'movies',movies);

                dispatch(setMoviesByGenre(movies));
            }}
            ellipsis={1}
        />
    )
}