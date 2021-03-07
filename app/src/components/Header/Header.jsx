import {Navbar, NavbarBrand, Nav, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React from 'react';

import Logo from '../../assets/airbnb_logo.png';
import './Header.css';


export default function Header() {
    return (
        <Navbar className = "main white nav-margins" expand = "lg">
            <Col>
                <NavbarBrand className = "logo-size" alt = "logo">
                    <img
                        height = "50"
                        width = "50"
                        src = {Logo}
                        alt = "logo"
                    />
                </NavbarBrand>
            </Col>
            <Col>
                <Navbar.Collapse id = "basic-navbar-nav">
                    <Nav className = "mx-auto parent">
                        <Nav.Link href = "#saves" className = "poppins black link-style child">
                            Сохранено
                        </Nav.Link>
                        <Nav.Link href = "#routes" className = "poppins black link-style child">
                            Поездки
                        </Nav.Link>
                        <Nav.Link href = "#help" className = "poppins black link-style child">
                            Помощь
                        </Nav.Link>
                        <Nav.Link href = "#trav" className = "poppins black link-style child">
                            Путешествия
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Col>
            <Col className = "text-right">
                <Navbar.Collapse id = "basic-navbar-nav">
                    <Link to = "/new" className = "mx-auto parent">
                        <button className = "new">
                            Зарегистрируйте вашу недвижимость
                        </button>
                    </Link>
                </Navbar.Collapse>
                <Navbar.Toggle aria-controls = "basic-navbar-nav" />
            </Col>
        </Navbar>
    );
}
