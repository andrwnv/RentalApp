import {Navbar, NavbarBrand, Nav, Col, Button, FormControl, Form, NavDropdown} from 'react-bootstrap';
import React from 'react';

import Logo from '../../assets/airbnb_logo.png';
import './Header.css';
import SettingsMenu from '../SettingsMenu/SettingsMenu';


export default function Header() {
    return (
        <Navbar collapseOnSelect expand = "lg" bg = "dark" variant = "dark">
            <Navbar.Brand href = "#home">
                <img
                    alt = ""
                    src = {Logo}
                    width = "30"
                    height = "30"
                    className = "d-inline-block align-top"
                />{' '}
                Rental App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls = "responsive-navbar-nav" />
            <Navbar.Collapse id = "responsive-navbar-nav">
                <Nav className = "mr-auto">
                    <Nav.Link href = "#features">Сохранено</Nav.Link>
                    <Nav.Link href = "#pricing">Поездки</Nav.Link>
                    <Nav.Link href = "#pricing">Помощь</Nav.Link>
                    <Nav.Link href = "#pricing">Путешествия</Nav.Link>
                </Nav>
                <Nav>
                    <SettingsMenu />
                    <Nav.Link eventKey = {2} href = "/new">
                        Создайте свое объявление!
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
