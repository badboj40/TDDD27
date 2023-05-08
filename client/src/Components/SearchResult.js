import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Card, Container, Nav, OverlayTrigger, Row, ToggleButton, Tooltip } from 'react-bootstrap'
import { auth } from '../Firebase/Firebase'
import { useDispatch } from 'react-redux';
import { addItemToWatchlist, removeItemFromWatchlist, setMovie } from '../store';
import axios from 'axios';
import { HandleMoviePage } from '../Helpers/HandleMoviePage';
import { WatchListToggleButton } from './WatchlistToggleButton';
import { SeenListToggleButton } from './SeenlistToggleButton';

export function SearchResultPage(props) {
    const isSignedIn = props.isSignedIn;
    const searchResult = useSelector(state => state.search.searchTerm);

    const notFoundLogo = "/static/images/unknown-file-icon.png"

    const navigate = useNavigate()
    const dispatch = useDispatch()


    return (
        <div className="SearchResult">
            <Container>
                {searchResult ? (
                    Object.entries(searchResult).map((movie_kv) => (
                        <Card className="" key={movie_kv[0]} style={{ width: '62rem' }}>
                            <Row>
                                <div className='col-sm-5'>
                                    <Nav>
                                        <Nav.Link onClick={() => HandleMoviePage(movie_kv, navigate, dispatch)} style={{ padding: 0 }}>
                                            <Card.Img variant="top"
                                                src={movie_kv[1].banner}
                                                onError={(e) => { e.target.src = notFoundLogo }} />
                                        </Nav.Link>
                                    </Nav>
                                </div>
                                <div className='col-sm-7'>
                                    <Card.Body>
                                        <Card.Title>{movie_kv[1].title}</Card.Title>
                                        <Card.Text>{movie_kv[1].plot}</Card.Text>
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