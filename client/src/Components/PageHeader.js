import React, { useState } from 'react'
import axios from 'axios';
import { setSearchTerm } from '../store';

import { Button } from 'react-bootstrap';
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';

import './Login.css'
import './SignOutButton.css';

import { signInWithGoogle } from "../Firebase/Firebase"
import { signOutFromGoogle } from "../Firebase/Firebase";

export function PageHeader(props) {

    const isSignedIn = props.isSignedIn;

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const pageLogo = "/static/images/popcorn.png"
    const accountLogo = "/static/images/account.png"

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSearchQuery(searchQuery)

        let path = '/movies/search/';
        const url = path + searchQuery

        await axios.get('http://' + window.location.host + path + searchQuery)
        .then((result) => {
                console.log(result);
                console.log(setSearchTerm)
                navigate(url);
                dispatch(setSearchTerm(result.data));
            })
        .catch((error) => {
            console.error(error);
        })
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="PageHeader">   
            <header className="PageHeader-header">
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container className='d-flex'>
                        <Navbar.Brand as={Link} to="/" className='d-flex'>
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
                            <Nav.Link as={Link} to="/">Movies</Nav.Link>
                            <Nav.Link as={Link} to="/watchlist">Watchlist</Nav.Link>
                        </Nav>
                        <Container className='d-flex justify-content-end'> 
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Enter movie"
                                className="me-2"
                                aria-label="Search"
                                name="searchQuery"
                                onChange={handleChange}
                            />
                        </Form>
                        <Nav>
                        { isSignedIn === true ?
                            <NavDropdown title={<img
                                src={accountLogo}
                                width="45"
                                height="45"
                                className="gg-logo"
                                alt="GGWatch Logo"
                            />} 
                            id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/account">Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/signout">
                                    <Button className="logout-btn" variant="light" onClick={(e) => {
                                        e.preventDefault();
                                        signOutFromGoogle();
                                    }}>Sign out
                                    </Button>{' '}
                                </NavDropdown.Item>
                            </NavDropdown>
                            : 
                            <button className="login-with-google-btn" onClick={signInWithGoogle}>
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