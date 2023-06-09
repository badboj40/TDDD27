import React, { useState } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Login.css'
import './SignOutButton.css';

import { auth, signInWithGoogle } from "../Firebase/Firebase"
import { signOutFromGoogle } from "../Firebase/Firebase";
import { setSearchTerm } from '../store';
import { setMovieGenres } from '../store';
import { GetHomeMovies } from '../Helpers/GetData';
import { ResetFilter } from '../Helpers/ResetSlider';
import { LoadingSpinner } from './LoadingSpinner';



export function PageHeader(props) {

    let user = auth.currentUser;

    const isSignedIn = props.isSignedIn;
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pageLogo = "/static/images/popcorn.png"

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        setSearchQuery(searchQuery)

        let path = '/movies/search/';
        const url = path + searchQuery

        await axios.get('http://' + window.location.host + path + searchQuery)
            .then((result) => {
                navigate(url);
                dispatch(setSearchTerm({ [searchQuery]: result.data }));
                ResetFilter(dispatch)
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleBrowse = async () => {
        await axios.get('http://' + window.location.host + '/genres')
            .then((result) => {
                dispatch(setMovieGenres(result.data))
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleHomeMovies = async () => {
        await GetHomeMovies(1, dispatch)
    }

    return (
        <div className="PageHeader">
            <header className="PageHeader-header">
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container className='d-flex'>
                        <Navbar.Brand as={Link} to="/" className='d-flex'
                            onClick={handleHomeMovies}>
                            <img
                                src={pageLogo}
                                width="45"
                                height="45"
                                className="gg-logo"
                                alt="GGWatch Logo"
                            />
                            <h1 className=''>GGWatch</h1>
                        </Navbar.Brand>
                        <Nav>
                            <Nav.Link as={Link} to="/browse"
                                onClick={handleBrowse}>Browse</Nav.Link>
                            <Nav.Link as={Link} to="/watchlist">Watchlist</Nav.Link>
                            <Nav.Link as={Link} to="/seen">Seen</Nav.Link>
                        </Nav>
                        <Container className='d-flex justify-content-end'>
                            <LoadingSpinner isLoading={isLoading}
                                style={{ marginTop: '15px', marginRight: '5px' }}
                                size="lg" 
                                variant="light"/>
                            <Form
                                className="d-flex"
                                disabled={isLoading}
                                onSubmit={(e) => {
                                    if (!isLoading) {
                                        e.currentTarget.value = ""
                                        handleSubmit(e)
                                    }
                                }}>
                                <Form.Control
                                    type="search"
                                    placeholder="Enter movie"
                                    className="me-2"
                                    aria-label="Search"
                                    name="searchQuery"
                                    disabled={isLoading}
                                    onChange={handleChange}
                                />

                            </Form>
                            <Nav>
                                {isSignedIn === true ?
                                    <NavDropdown title={<img
                                        src={user ? user.photoURL : ""}
                                        width="45"
                                        height="45"
                                        className="gg-logo"
                                        alt={"Account Logo"}
                                    />}
                                        id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/account">Settings</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/signout">
                                            <Button className="logout-btn" variant="light" onClick={(e) => {
                                                e.preventDefault();
                                                signOutFromGoogle(dispatch);
                                                navigate('/')
                                            }}>Sign out
                                            </Button>{' '}
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    <button className="login-with-google-btn" onClick={() => signInWithGoogle(dispatch)}>
                                        Sign in with Google
                                    </button>
                                }
                            </Nav>
                        </Container>
                    </Container>
                </Navbar>
            </header>
        </div>
    )
}