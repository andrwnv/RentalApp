import React from 'react';
import {DropdownButton, Dropdown, ButtonGroup, NavDropdown} from 'react-bootstrap';


class SettingsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.logout = this.logout.bind(this);
    }

    deleteAccount(e) {
        console.log('Deleting Account')
    }

    logout(e) {
        console.log('Logging out')
    }

    render() {
        return (
            <NavDropdown title={'Настройки'} id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                    <img src={localStorage.getItem('photoLink')} style={{
                        borderRadius: '100%',
                        maxWidth: '20px',
                        marginRight: '15px'
                    }}/>
                    Ваш профиль
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Ваши объявления</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Выйти</NavDropdown.Item>
            </NavDropdown>
        );
    }
}

export default SettingsMenu;
