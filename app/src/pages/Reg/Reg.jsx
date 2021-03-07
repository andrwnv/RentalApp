import React, {useState} from 'react';
// import api from '../../services/api';

import logoSmall from '../../assets/logosmall.png';
import './Reg.css';

export default function Reg({history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [midName, setMidName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        // if (!email) {
        //   return alert("");
        // }
        //
        // const response = await api.post("/sessions", { email });
        // const { _id } = response.data;
        //
        // localStorage.setItem("user", _id);
        // localStorage.setItem("name", name);

        history.push('/');
    }

    return (
        <div className = "register">
            <img src = {logoSmall} alt = "" id = "logo" />
            <div className = "containerLogin">
                <div className = "contentLogin">
                    <p>Войти</p>
                    <form onSubmit = {handleSubmit}>
                        <label htmlFor = "name">Фамилия *</label>
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
                        <label htmlFor = "name">Отчество</label>
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
