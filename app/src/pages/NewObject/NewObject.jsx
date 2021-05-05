import React, { useState, useMemo } from 'react';
import { Carousel } from 'react-bootstrap';

import Select from 'react-select';

import camera from '../../assets/camera.svg';
import airbnb from '../../assets/airbnb.png';
import api from '../../services/api';

import './NewObject.css';


export default function NewObject({history}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [price, setPrice] = useState('');

    const [files, setFiles] = useState(null);
    const photos = [];

    if( files ) {
        Array.from(files).forEach(file => {
            console.log(file);
            photos.push(
                <Carousel.Item style = {{
                    height: '12em'
                }}>
                    <img
                        className = "d-block w-100"
                        src = {URL.createObjectURL(file)}
                    />
                </Carousel.Item>
            );

        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        api.post();

        // history.push('/dashboard');
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
                        >
                            <input
                                type = 'file'
                                onChange = {event => {
                                    setFiles(event.target.files);
                                }}

                                multiple = 'multiple'
                            />
                            <img src = {camera} alt = "Select img" />
                        </label>

                        <Carousel style = {{
                            marginBottom: '8px'
                        }}>
                            {photos}
                        </Carousel>

                        <label htmlFor = "title">Название собственности *</label>
                        <input
                            type = "text"
                            id = "title"
                            value = {title}
                            placeholder = "Название вашей собственности..."
                            onChange = {event => setTitle(event.target.value)}
                        />

                        <label htmlFor = "description">Описание собственности *</label>
                        <textarea
                            id="description"
                            value={description}
                            placeholder = "Описание вашей собственности..."
                            onChange={event => setDescription(event.target.value)}
                            cols="40"
                            rows="5"
                        />

                        <label htmlFor = "city">Адрес *</label>
                        <input
                            type = "text"
                            id = "city"
                            value = {city}
                            placeholder = "Название города..."
                            onChange = {event => setCity(event.target.value)}
                        />

                        <label htmlFor = "houseNumber">Номер дома *</label>
                        <input
                            type = "text"
                            id = "houseNumber"
                            value = {houseNumber}
                            placeholder = "Сумма, начисляемая за день..."
                            onChange = {event => setHouseNumber(event.target.value)}
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
