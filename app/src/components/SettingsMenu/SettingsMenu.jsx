import React from 'react';
import { NavDropdown } from 'react-bootstrap';

import cookies from '../../services/cookies';


export default function SettingsMenu() {
    const logout = (_) => {
        cookies.remove('token', {path: '/'});
    }

    return (
        <NavDropdown title = {'Настройки'} id = "collasible-nav-dropdown">
            <NavDropdown.Item href = "#action/3.1">
                <img src = {localStorage.getItem('photoLink')} style = {{
                    borderRadius: '100%',
                    maxWidth: '20px',
                    marginRight: '15px'
                }} alt={''}/>
                Ваш профиль
            </NavDropdown.Item>
            <NavDropdown.Item href = "#action/3.2">Ваши объявления</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href = "#action/3.4" onClick = {logout}>Выйти</NavDropdown.Item>
        </NavDropdown>
    );
}
