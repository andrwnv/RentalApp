import { Navbar, Nav } from 'react-bootstrap';
import React from 'react';

import SettingsMenu from '../SettingsMenu/SettingsMenu';
import Logo from '../../assets/airbnb_logo.png';
import './Header.css';


export default function Header() {
    return (
        <Navbar collapseOnSelect expand = "lg" bg = "dark" variant = "dark" style={{
            paddingLeft: "50px",
            paddingRight: "50px",
        }}>
            <Navbar.Brand href = "#home">
                <img
                    alt = ""
                    src = {Logo}
                    width = "30"
                    height = "30"
                    className = "d-inline-block align-top"
                    style={{
                        marginRight: '10px'
                    }}
                />{' '}
                Rental App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls = "responsive-navbar-nav" />
            <Navbar.Collapse id = "responsive-navbar-nav">
                <Nav className = "mr-auto">
                    <Nav.Link href = "#features">Сохранено</Nav.Link>
                    <Nav.Link href = "#travels">Поездки</Nav.Link>
                    <Nav.Link href = "#help">Помощь</Nav.Link>
                    <Nav.Link href = "#trips">Путешествия</Nav.Link>
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
