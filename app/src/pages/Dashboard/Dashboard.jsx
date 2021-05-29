import React, { useState } from 'react';

import Experience from '../../components/Experience/Experience';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';

import Header from '../../components/Header/Header';
import api from '../../services/api';

import './Dashboard.css';
import { Ads } from '../../components/Ads/Ads';

import Cookies from '../../services/cookies';
import Slider from '@material-ui/core/Slider';

export default function Dashboard() {
    const maxRatingValue = 10;

    const [data, setData] = useState(undefined);
    const [isEndData, setIsEndData] = useState(false);
    const [buttonText, setButtonText] = useState('Загрузить еще...');
    const [priceValue, setPriceValue] = useState([0, 85]);
    const [ratingValue, setRatingValue] = useState([0, 10]);
    const [maxPriceValue, setMaxPriceValue] = useState(100);
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filtered, setFiltered] = useState(null);
    const [usedFilter, setUsedFilter] = useState(false);

    localStorage.setItem('countForLoad', '' + 4);
    localStorage.setItem('currentPaddingForLoad', '' + 0);

    const headers = {
        headers: {
            'token': Cookies.get('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const getAdsData = (count, padding) => {
        api.get(`http://localhost:3080/rent_ads/all?count=${count}&padding=${padding}`, headers).then(res => {
            const loadedData = res.data.data;

            if( loadedData.length === 0 ) {
                setIsEndData(true);
                setButtonText('Больше нет...');
            } else {
                setIsEndData(false);
                setButtonText('Загрузить еще...');
            }

            data === undefined ? setData(loadedData) : setData(data.concat(loadedData));
        });
    };

    const jsxData = [];

    if( data === undefined ) {
        getAdsData(localStorage.getItem('countForLoad'),
            localStorage.getItem('currentPaddingForLoad'));
    } else {
        let curIndex = 0;
        data.forEach(obj => {
            if( jsxData.length === 0 ) {
                jsxData.push([]);
            } else if( jsxData[curIndex].length === 4 ) {
                jsxData.push([]);
                curIndex++;
            }

            jsxData[curIndex].push(<Ads
                name = {obj.title} desc = {obj.description}
                picLinks = {obj.mediaLinks.urls[0]} objectId = {obj.id}
            />);
        });
    }

    const search = () => {
        const _beginDate = new Date(beginDate);
        const _endDate = new Date(endDate);
        const today = new Date();

        if( _beginDate < today || _endDate < today || !beginDate || !endDate) {
            alert('Заполните все поля дат!');
            return;
        }

        console.log(JSON.stringify(priceValue));
        console.log(JSON.stringify(ratingValue));
        console.log(JSON.stringify([new Date(beginDate).getTime(), new Date(endDate).getTime()]));

        api.get(`http://localhost:3080/rent_ads/filter?date=${JSON.stringify([new Date(beginDate).getTime(), new Date(endDate).getTime()])}&rating=${JSON.stringify(ratingValue)}&price=${JSON.stringify(priceValue)}`, headers)
            .then(res => {
                let data = [];
                let blocks = [];

                res.data.data.forEach(obj => {
                    data.push(
                        <Ads
                            name = {obj.title} desc = {obj.description}
                            picLinks = {obj.mediaLinks.urls[0]} objectId = {obj.id}
                        />
                    );

                    if (data.length % 4 === 0 && data.length !== 0) {
                        blocks.push(
                            <Row
                                className = 'row justify-content-center' style = {{
                                flexWrap: 'nowrap',
                            }}
                            >
                                {data}
                            </Row>
                        );

                        data = [];
                    }
                });

                setUsedFilter(true);
                setFiltered(blocks);
            });
    };

    const resJSX = [];
    jsxData.forEach(arr => {
        resJSX.push(
            <Row
                className = 'row justify-content-center' style = {{
                flexWrap: 'nowrap',
            }}
            >
                {arr}
            </Row>
        );
    })

    const loadMoreEvent = (_) => {
        const padding = +localStorage.getItem('currentPaddingForLoad') + data.length;
        getAdsData(localStorage.getItem('countForLoad'), padding);

        localStorage.setItem('currentPaddingForLoad', '' + padding);
    };

    return (
        <div className = 'containerDashboard'>
            <Header />

            <Experience />
            <Container>
                <Row
                    className = 'justify-content-md-center' style = {{marginBottom: '20px', marginTop: '20px'}}
                >
                    <p>Выберите пределы стоиомсти (руб/день)</p>
                    <Slider
                        value = {priceValue}
                        step = {5}
                        max = {maxPriceValue}
                        onChange = {(event, value) => {
                            setPriceValue(value);
                            setMaxPriceValue(value[1] + 1500);
                        }}
                        valueLabelDisplay = 'auto'
                        aria-labelledby = 'range-slider'
                    />
                </Row>

                <Row
                    className = 'justify-content-md-center' style = {{marginBottom: '20px', marginTop: '20px'}}
                >
                    <p>Выберите пределы рейтинга</p>
                    <Slider
                        value = {ratingValue}
                        step = {1}
                        max = {maxRatingValue}
                        onChange = {(event, value) => {
                            setRatingValue(value);
                        }}
                        valueLabelDisplay = 'auto'
                        aria-labelledby = 'range-slider'
                    />
                </Row>

                <Row className = 'justify-content-md-center' style = {{marginBottom: '2em'}}>
                    <Col>
                       <p style = {{textAlign: 'center'}}>Дата начала</p>
                        <Form.Control
                            onChange = {(event) => {
                                setBeginDate(event.target.value);
                            }}
                            value = {beginDate}
                            type = 'date' name = 'beginDate'
                            style = {{
                                width: '50%',
                                marginTop: 0,
                                marginRight: 'auto',
                                marginBottom: 0,
                                marginLeft: 'auto',
                            }}
                        />
                    </Col>

                    <Col>
                       <p style = {{textAlign: 'center'}}>Дата окончания</p>
                        <Form.Control
                            onChange = {(event) => {
                                setEndDate(event.target.value);
                            }}
                            value = {endDate}
                            type = 'date' name = 'beginDate'
                            style = {{
                                width: '50%',
                                marginTop: 0,
                                marginRight: 'auto',
                                marginBottom: 0,
                                marginLeft: 'auto',
                            }}
                        />
                    </Col>
                </Row>

                <Row className = 'justify-content-md-center'>
                    <Button style = {{width: '40%'}} onClick = {search}>Поиск</Button>
                </Row>

                <Row className = 'justify-content-md-center'>
                    <Button
                        variant = 'success' style = {{width: '40%', marginTop: '1em', marginBottom: '2em'}} disabled = {!usedFilter}
                        onClick = {() => {
                            setUsedFilter(false);
                            setFiltered(null);
                        }}
                    >Убрать фильтрацию</Button>
                </Row>
            </Container>

            {
                usedFilter === false
                    ? (
                        <div>
                            <h2 className = 'headText'>Рекомендуется для вас</h2>
                            <div className = 'dataContainer'>
                                    {resJSX}
                            </div>

                            <Container style = {{width: '15%', marginBottom: '20px', marginTop: '10px'}}>
                                <Button
                                    variant = 'outline-primary'
                                    onClick = {loadMoreEvent}
                                    disabled = {isEndData}
                                >
                                    {buttonText}
                                </Button>
                            </Container>
                        </div>
                    )
                    : (
                        <div className = 'dataContainer'>
                                {filtered}
                        </div>
                    )
            }
        </div>
    );
};
