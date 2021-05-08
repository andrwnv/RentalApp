import React, { useState } from 'react';

import api from '../../services/api';
import cookies from '../../services/cookies';

import logoSmall from '../../assets/logosmall.png';
import './Reg.css';

export default function Reg({history}) {
    if (cookies.get('token')) {
        history.push('/dashboard');
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [midName, setMidName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    let _status = 0;

    async function handleSubmit(event) {
        event.preventDefault();

        const data = {
            firstName: name,
            middleName: midName.length === 0 ? null : midName,
            lastName: lastName,
            eMail: email,
            birthDay: '2000-03-21',
            phoneNumber: phoneNumber,
            password: password
        };

        try {
            const res = await api.post('http://localhost:3080/client/signup', data);
            _status = res.status;
        } catch(err) {
            if( err.response ) {
                _status = err.response.status;
            }
        }

        if( _status >= 200 && _status < 300 ) {
            alert('Пользователь создан!');
            history.push('/');

            return;
        }

        if( _status === 409 ) {
            alert('Пользователь уже был создан ранее!');
        } else if( _status === 400 ) {
            alert('Поля регистрации не могут быть пустыми!');
        } else {
            alert('Внутренняя ошибка!');
        }
    }

    return (
        <div className = "register">
            <img src = {logoSmall} alt = "" id = "logo" />
            <div className = "containerLogin">
                <div className = "contentLogin">
                    <p>Зарегистрироваться</p>
                    <form onSubmit = {handleSubmit}>
                        <label htmlFor = "lastName">Фамилия *</label>
                        <input
                            type = "text"
                            id = "name"
                            placeholder = "Скажи нам свою фамилию..."
                            value = {lastName}
                            onChange = {event => setLastName(event.target.value)}
                        />
                        <label htmlFor = "name">Имя *</label>
                        <input
                            type = "text"
                            id = "name"
                            placeholder = "Скажи нам своё имя..."
                            value = {name}
                            onChange = {event => setName(event.target.value)}
                        />
                        <label htmlFor = "middleName">Отчество</label>
                        <input
                            type = "text"
                            id = "name"
                            placeholder = "Скажи нам своё отчетство..."
                            value = {midName}
                            onChange = {event => setMidName(event.target.value)}
                        />
                        <label htmlFor = "phoneNumber">Номер телефона *</label>
                        <input
                            type = "text"
                            id = "phoneNumber"
                            placeholder = "Скажи нам свой номер телефона..."
                            value = {phoneNumber}
                            onChange = {event => setPhoneNumber(event.target.value)}
                        />
                        <label htmlFor = "email">E-mail *</label>
                        <input
                            type = "text"
                            id = "email"
                            placeholder = "Скажи нам свой e-mail..."
                            value = {email}
                            onChange = {event => setEmail(event.target.value)}
                        />
                        <label htmlFor = "email">Пароль *</label>
                        <input
                            type = "password"
                            id = "password"
                            placeholder = "Введи пароль..."
                            value = {password}
                            onChange = {event => setPassword(event.target.value)}
                        />
                        <button type = "submit" className = "btn">
                            Зарегестрироваться
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
