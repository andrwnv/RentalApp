import { Navbar, Nav } from 'react-bootstrap';
import React from 'react';

import SettingsMenu from '../SettingsMenu/SettingsMenu';
import Logo from '../../assets/logomain.png';
import './Header.css';


export default function Header() {
    return (
        <Navbar collapseOnSelect expand = "lg" bg = "dark" variant = "dark" style={{
            paddingLeft: "50px",
            paddingRight: "50px",
        }}>
            <Navbar.Brand href = "/dashboard">
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
                    <Nav.Link href = "/plane_trip">Запланировать поездку</Nav.Link>
                    <Nav.Link href = "/dashboard">Объявления</Nav.Link>
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
