import React from 'react';
import { Container, Button, Col, Row, ListGroup, Form } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import Select from 'react-select';

import Header from '../../components/Header/Header';

import api from '../../services/api';
import { Icon } from '@iconify/react';
import dashCircle from '@iconify-icons/bi/dash-circle';
import Cookies from '../../services/cookies';


export default class PlannedTrip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            priceValue: [0, 85],
            ratingValue: [0, 10],
            maxRatingValue: 10,
            maxPriceValue: 100,
            beginDate: '',
            comfortData: [],
            userTrips: []
        };

        this.aquaticCreatures = [
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
    }

    createTrip = () => {
        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: `${token}`
        };

        let comfortData = [];
        this.state.comfortData.forEach((val, index) => {
            comfortData.push(val.label);
        });

        const data = {
            comfortProps: comfortData,
            price: this.state.priceValue,
            rating: this.state.ratingValue,
            beginDate: this.state.beginDate
        }

        api.post('http://localhost:3080/client/trip/create', data, {headers}).then(_ => {
            alert('Путешествие создано');
        }).catch(_ => alert('Некорректо заполнены поля!'));
    }

    _loadTrips = () => {
        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: `${token}`
        };

        api.get('http://localhost:3080/client/trip/all', {headers}).then(res => {
            let data = res.data.data;
            this.setState({userTrips: data});
        });
    }

    tripsJSX = () => {
        this._loadTrips();

        let jsxData = [];

        if (this.state.userTrips.length === 0) {
            return <ListGroup.Item style = {{marginLeft: '-0.8em'}}>Здесь пока что пусто</ListGroup.Item>
        }

        this.state.userTrips.forEach(item => {
            const comfortData = [];

            item.comfortProps.forEach(item => {
                comfortData.push(
                    <li style={{paddingLeft: '20px'}}>{item}</li>
                );
            });

            jsxData.push(
                <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                    <Row>
                        <Col>
                            <p className = 'objInnerText'>Дата начала: {item.beginDate}</p>
                            <p className = 'objInnerText'>
                                Выбранные удобства: {comfortData.length === 0 ? 'Ничего небыло выбрано' : comfortData}
                            </p>
                            <p className = 'objInnerText'>Выбранные границы рейтинга: от {item.requireRatingFrom} до {item.requireRatingTo}</p>
                            <p className = 'objInnerText'>Выбранные стоимости: от {item.priceFrom} до {item.priceTo} руб/день</p>
                        </Col>

                        <button className = 'threeDotButton' style = {{paddingRight: '10px'}}
                            onClick={() => {
                                const token = Cookies.get('token');
                                const headers = {
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json',
                                    token: `${token}`
                                };

                                console.log(headers);

                                api.delete('http://localhost:3080/client/trip/delete', { id: item.id }, {headers}).then(_ => {
                                    this.forceUpdate();
                                });
                            }}>
                            <Icon icon = {dashCircle} />
                        </button>
                    </Row>
                </ListGroup.Item>
            );
        });

        return jsxData;
    }

    render() {
        return (
            <div>
                <Header />
                <Container style = {{maxWidth: '90%', marginBottom: '20px'}}>
                    <h2
                        style = {{
                            padding: 0,
                            marginBottom: '20px'
                        }}
                    >
                            Настройте новое путешествие:
                    </h2>

                    <Row className = 'justify-content-md-center'>
                        <Col style = {{maxWidth: '50%'}}>
                            <Select
                                options = {this.aquaticCreatures}
                                id = 'items'
                                placeholder = {'Условия...'}
                                isMulti
                                onChange = {(key, _) => {
                                    this.setState({comfortData: key});
                                }}
                            />
                        </Col>
                    </Row>

                    <Container>
                        <Row
                            className = 'justify-content-md-center' style = {{marginBottom: '20px', marginTop: '20px'}}
                        >
                            <p>Выберите пределы стоиомсти (руб/день)</p>
                            <Slider
                                value = {this.state.priceValue}
                                step = {5}
                                max = {this.state.maxPriceValue}
                                onChange = {(event, value) => {
                                    console.log(value);
                                    this.setState({priceValue: value, maxPriceValue: value[1] + 1500});
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
                                value = {this.state.ratingValue}
                                step = {1}
                                max = {this.state.maxRatingValue}
                                onChange = {(event, value) => {
                                    this.setState({ratingValue: value});
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
                                        this.setState({beginDate: event.target.value});
                                    }}
                                    value = {this.state.beginDate}
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
                            <Button style = {{width: '40%'}} onClick = {this.createTrip}>Запланировать!</Button>
                        </Row>
                    </Container>

                    <h2
                        style = {{
                            padding: 0,
                            marginTop: '40px'
                        }}
                    >
                            Уже запланированные вами:
                    </h2>

                    <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                        {this.tripsJSX()}
                    </ListGroup>
                </Container>
            </div>
        );
    }
}

