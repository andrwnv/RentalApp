import React from 'react';
import { NavDropdown } from 'react-bootstrap';

import cookies from '../../services/cookies';


export default function SettingsMenu() {
    const logout = (_) => {
        cookies.remove('token', {path: '/'});
    }

    return (
        <NavDropdown title = {'Настройки'} id = 'collasible-nav-dropdown'>
            <NavDropdown.Item href = '/current_user'>
                <img
                    src = {localStorage.getItem('photoLink')} style = {{
                    borderRadius: '100%',
                    maxWidth: '20px',
                    maxHeight: '20px',
                    marginRight: '15px',
                    objectFit: 'cover',
                }} alt = {''}
                />
                Ваш профиль
            </NavDropdown.Item>
            <NavDropdown.Item href = '#action/3.2'>История</NavDropdown.Item>
            <NavDropdown.Item href = '#action/3.2'>Ваши путешествия</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href = '/' onClick = {logout}>Выйти</NavDropdown.Item>
        </NavDropdown>
    );
}
