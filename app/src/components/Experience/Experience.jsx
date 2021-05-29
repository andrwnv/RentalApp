import { Col, Button, Form, FormControl, Row, Container } from 'react-bootstrap';
import React from 'react';

import './Experience.css';
import Slider from '@material-ui/core/Slider';


export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            priceValue: [0, 85],
            ratingValue: [0, 10],
            maxRatingValue: 10,
            maxPriceValue: 100,
            beginDate: '',
            endDate: '',
        }

        this.fullName = `${localStorage.getItem('firstName')}`;
    }

    search = () => {

    }

    render() {
        return (
            <div>
                <h2 className = "User">{this.fullName}, что ты хочешь найти?</h2>

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

                        <Col>
                           <p style = {{textAlign: 'center'}}>Дата окончания</p>
                            <Form.Control
                                onChange = {(event) => {
                                    this.setState({endDate: event.target.value});
                                }}
                                value = {this.state.endDate}
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
                        <Button style = {{width: '40%'}} onClick = {this.search}>Поиск</Button>
                    </Row>
                </Container>
            </div>
        );
    }
}
