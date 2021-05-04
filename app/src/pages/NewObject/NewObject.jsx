import React, { useState, useMemo } from 'react';
import Select from 'react-select';

import camera from '../../assets/camera.svg';
import airbnb from '../../assets/airbnb.png';

import './NewObject.css';


export default function NewObject({history}) {
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    // const [items, setItems] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();

        // const data = new FormData();
        // const user_id = localStorage.getItem('user');
        //
        // data.append('thumbnail', thumbnail);
        // data.append('title', title);
        // data.append('city', city);
        // data.append('items', items);
        //
        // data.append('price', price);
        // await api.post('/spots', data, {
        //     headers: {user_id}
        // });

        history.push('/dashboard');
    }

    const aquaticCreatures = [
        {label: 'Своя кухня', value: 'kitchen'},
        {label: 'Wi-Fi', value: 'wi-fi'},
        {label: 'Телевизор', value: 'tv'},
        {label: 'Фен', value: 'dryer'},
        {label: 'Стиральная машина', value: 'washer'},
        {label: 'Утюг', value: 'iron'},
        {label: 'Парковка', value: 'parking'},
        {label: 'Лифт', value: 'elevator'},
        {label: 'Рабочая зона', value: 'work-zone'},
        {label: 'Предметы первой необходимости', value: 'essentials'},
        {label: 'Вечеринки', value: 'party'},
    ];

    return (
        <div className = "background">
            <div className = "containerNew">
                <button id = "back_button" onClick = {() => {
                    history.push('/dashboard');
                }}>
                    <img src = {airbnb} alt = "airbnb" id = "logoAirbnb" />
                </button>
                <div className = "contentNew">
                    <form onSubmit = {handleSubmit}>
                        <label
                            id = "thumbnail"
                            style = {{backgroundImage: `url(${preview})`}}
                            className = {thumbnail ? 'has-thumbnail' : ''}
                        >
                            <input
                                type = "file"
                                onChange = {event => setThumbnail(event.target.files[0])}
                            />
                            <img src = {camera} alt = "Select img" />
                        </label>

                        <label htmlFor = "title">Название собственности *</label>
                        <input
                            type = "text"
                            id = "title"
                            value = {title}
                            placeholder = "Название вашей собственности..."
                            onChange = {event => setTitle(event.target.value)}
                        />

                        <label htmlFor = "city">Адрес *</label>
                        <input
                            type = "text"
                            id = "city"
                            value = {city}
                            placeholder = "Название города..."
                            onChange = {event => setCity(event.target.value)}
                        />

                        <label htmlFor = "items">Удобства *</label>
                        <Select
                            options = {aquaticCreatures}
                            id = 'items'
                            placeholder = {'Удобства...'}
                            isMulti
                        />

                        <label htmlFor = "price" className = "margin">Стоимость (Руб/день) *</label>
                        <input
                            type = "text"
                            id = "price"
                            value = {price}
                            placeholder = "Сумма, начисляемая за день..."
                            onChange = {event => setPrice(event.target.value)}
                        />

                        <button type = "submit" className = "btn">
                            Создать!
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
