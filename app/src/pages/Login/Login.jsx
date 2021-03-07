import React, {useState} from 'react';
// import api from '../../services/api';

import logoSmall from '../../assets/logosmall.png';
import './Login.css';


export default function Login({history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmitLogin(event) {
        // e.preventDefault();
        // if (!email) {
        //   return alert("");
        // }
        //
        // const response = await api.post("/sessions", { email });
        // const { _id } = response.data;
        //
        // localStorage.setItem("user", _id);
        // localStorage.setItem("name", name);

        history.push('/dashboard');
    }

    async function handleSubmitReg(event) {
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

        history.push('/register');
    }

    return (
        <div className = "login">
            <img src = {logoSmall} alt = "" id = "logo" />
            <div className = "containerLogin">
                <div className = "contentLogin">
                    <p>Войти</p>
                    <form onSubmit = {handleSubmitLogin}>
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
                            Войти
                        </button>
                    </form>
                </div>
            </div>

            <div className = "containerLogin">
                <div className = "contentLogin">
                    <p>Нет аккаунта?</p>
                    <form onSubmit = {handleSubmitReg}>
                        <button type = "submit" className = "btn">
                            Зарегестрироваться
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
