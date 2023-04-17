import { Button } from 'react-bootstrap';
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import './SignOutButton.css';

import { signOutFromGoogle } from "../Firebase/Firebase";


export function PageHeader() {

    const pageLogo = "/static/images/popcorn.png"

    return (
        <div className="PageHeader">   
            <header className="PageHeader-header">
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container className='d-flex'>
                        <Navbar.Brand href="/" className='d-flex'>
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
                            <Nav.Link href="/movies">Movies</Nav.Link>
                        </Nav>
                        <Container className='d-flex justify-content-end'> 
                        <Form className="d-flex justify-content-strecth">
                            <Form.Control
                                type="search"
                                placeholder="Enter movie"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-light" size="sm">Search</Button>
                            </Form>
                            <Nav>
                            <NavDropdown title="Account" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/account">Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/signout">
                                <Button className="logout-btn" variant="light" onClick={signOutFromGoogle}>
                                Sign out
                                </Button>{' '}
                                </NavDropdown.Item>
                            </NavDropdown>
                            </Nav> 
                        </Container>
                    </Container>
                </Navbar>
            </header>     
        </div>
    )
}