import React, { useState, useMemo } from 'react';
import { Carousel } from 'react-bootstrap';

import Select from 'react-select';

import camera from '../../assets/camera.svg';
import airbnb from '../../assets/airbnb.png';
import api from '../../services/api';

import './NewObject.css';
import Cookies from '../../services/cookies';


export default function NewObject({history}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [country, setCountries] = useState('');
    const [street, setStreets] = useState('');
    const [locality, setLocalities] = useState('');
    const [localityType, setLocalitiesTypes] = useState('');
    const [houseType, setHouseType] = useState('');
    const [price, setPrice] = useState('');

    const [apiCountries, setApiCountries] = useState([]);
    const [apiStreets, setApiStreets] = useState([]);
    const [apiLocalities, setApiLocalities] = useState([]);
    const [apiLocalitiesTypes, setApiLocalitiesTypes] = useState([]);
    const [apiHouseTypes, setApiHouseType] = useState([]);

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

        const data = {
            title: title,
            description: description,
            price: price,
            country: country,
            street: street,
            localityType: localityType,
            locality: locality,
            houseNumber: houseNumber,
            objectType: houseType
        }

        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: `${token}`
        };

        api.post('http://localhost:3080/rent_ads', data, {headers}).then(res => {
            alert('Объявление создано!');
            history.push('/dashboard');
        }).catch(err => {
            alert('Не корректно заполнены поля!');
        });
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

    if( apiCountries.length === 0 ) {
        api.get('http://localhost:3080/classifiers/countries').then((res) => {
            const data = res.data.data;
            const _apiCountries = [];

            data.forEach(item => {
                // console.log(item.name);
                _apiCountries.push({
                    label: item.name,
                    value: item.name
                });
            });

            setApiCountries(_apiCountries);
        });
    }

    if( apiStreets.length === 0 ) {
        api.get('http://localhost:3080/classifiers/streets').then((res) => {
            const data = res.data.data;
            const _apiStreets = [];

            data.forEach(item => {
                _apiStreets.push({
                    label: item.name,
                    value: item.name
                });
            });

            setApiStreets(_apiStreets);
        });
    }

    if( apiLocalities.length === 0 ) {
        api.get('http://localhost:3080/classifiers/localities').then((res) => {
            const data = res.data.data;
            const _apiLocalities = [];

            data.forEach(item => {
                _apiLocalities.push({
                    label: item.name,
                    value: item.name
                });
            });

            setApiLocalities(_apiLocalities);
        });
    }

    if( apiLocalitiesTypes.length === 0 ) {
        api.get('http://localhost:3080/classifiers/localities_types').then((res) => {
            const data = res.data.data;
            const _apiLocalitiesTypes = [];
            data.forEach(item => {
                _apiLocalitiesTypes.push({
                    label: item.name,
                    value: item.name
                });
            });
            setApiLocalitiesTypes(_apiLocalitiesTypes);
        });
    }

    if( apiHouseTypes.length === 0 ) {
        api.get('http://localhost:3080/classifiers/house_types').then((res) => {
            const data = res.data.data;
            const _apiHouseTypes = [];

            data.forEach(item => {
                _apiHouseTypes.push({
                    label: item.typeName,
                    value: item.typeName
                });
            });

            setApiHouseType(_apiHouseTypes);
        });
    }

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

                        <Carousel
                            style = {{
                                marginBottom: '8px'
                            }}
                        >
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
                            id = "description"
                            value = {description}
                            placeholder = "Описание вашей собственности..."
                            onChange = {event => setDescription(event.target.value)}
                            cols = "40"
                            rows = "5"
                        />

                        <label htmlFor = "objectType">Тип объекта *</label>
                        <Select
                            options = {apiHouseTypes}
                            id = 'objectType'
                            placeholder = {'Название типа объекта...'}
                            onChange = {event => {
                                setHouseType(event.value);
                            }}
                        />

                        <label htmlFor = "country" className = 'select'>Страна *</label>
                        <Select
                            options = {apiCountries}
                            id = 'country'
                            placeholder = {'Название страны...'}
                            onChange = {event => {
                                setCountries(event.value);
                            }}
                        />

                        <label htmlFor = "streets" className = 'select'>Улица *</label>
                        <Select
                            options = {apiStreets}
                            id = 'streets'
                            placeholder = {'Название улицы...'}
                            onChange = {event => {
                                setStreets(event.value);
                            }}
                        />

                        <label htmlFor = "localityType" className = 'select'>Тип населенного пункта *</label>
                        <Select
                            options = {apiLocalitiesTypes}
                            id = 'localityType'
                            placeholder = {'Название типа населенного пункта...'}
                            onChange = {event => {
                                setLocalitiesTypes(event.value);
                            }}
                        />

                        <label htmlFor = "locality" className = 'select'>Населенный пункт *</label>
                        <Select
                            options = {apiLocalities}
                            id = 'locality'
                            placeholder = {'Название населенного пункта...'}
                            onChange = {event => {
                                setLocalities(event.value);
                            }}
                        />

                        <label htmlFor = "houseNumber" className = 'select'>Номер дома *</label>
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
                            onChange = {event => {
                                console.log(event);
                                console.log('Im here');
                            }}
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
