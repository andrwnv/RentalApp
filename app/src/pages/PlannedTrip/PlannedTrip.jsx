import React from 'react';
import { Container, Button, Col, Row, ListGroup, Form } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import Select from 'react-select';

import Header from '../../components/Header/Header';

import api from '../../services/api';
import { Icon } from '@iconify/react';
import dashCircle from '@iconify-icons/bi/dash-circle';


export default class PlannedTrip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            priceValue: [0, 85],
            ratingValue: [0, 10],
            maxRatingValue: 10,
            maxPriceValue: 100,
            beginDate: '',
            comfortData: []
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
                        <Col style={{maxWidth: '50%'}}>
                            <Select
                                options = {this.aquaticCreatures}
                                id = 'items'
                                placeholder = {'Условия...'}
                                isMulti
                                onChange = {(_, value) => {
                                    this.setState({comfortData: value});
                                }}
                            />
                        </Col>
                    </Row>

                    <Container>
                        <Row className = 'justify-content-md-center' style = {{marginBottom: '20px', marginTop: '20px'}}>
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

                        <Row className = 'justify-content-md-center' style = {{marginBottom: '20px', marginTop: '20px'}}>
                            <p>Выберите пределы рейтинга</p>
                            <Slider
                                value = {this.state.ratingValue}
                                step = {1}
                                max = {this.state.maxRatingValue}
                                onChange = {(event, value) => {
                                    console.log(value);
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
                                    onChange={(event) => {
                                        this.setState({beginDate: event.target.value});
                                    }}
                                    value={this.state.beginDate}
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
                            <Button style = {{width: '40%'}}>Запланировать!</Button>
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
                        <ListGroup.Item style = {{marginLeft: '-0.8em'}}>Здесь пока что пусто</ListGroup.Item>
                        <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                            <Row>
                                <Col>
                                    <h4>Object name</h4>
                                    <p className = 'objInnerText'>Дата начала: 10-01-2020</p>
                                    <p className = 'objInnerText'>Выбранные удобства: some list</p>
                                    <p className = 'objInnerText'>Выбранные границы рейтинга: от 7 до 10</p>
                                    <p className = 'objInnerText'>Выбранные стоимости: от 7 до 10 руб/день</p>
                                </Col>

                                <button className = 'threeDotButton' style={{paddingRight: '10px'}}>
                                    <Icon icon = {dashCircle} />
                                </button>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
            </div>
        );
    }
}

