import React from 'react';
import { Container, Button, Col, Row, ListGroup, Modal, Carousel, Form, Table, FormCheck } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Icon } from '@iconify/react';

import threeDotsVertical from '@iconify-icons/bi/three-dots-vertical';
import Header from '../../components/Header/Header';

import Cookies from '../../services/cookies';

export default class ObjectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            features: [],
            showBookingModal: false,
            showBookingModalError: false,
            endDate: '',
            beginDate: ''
        }

        this.history = props.history;
        this.counter = 1;
        this.products = [
            {
                id: 1,
                name: '',
                price: '25',
                selected: false
            },
            {
                id: 2,
                name: '',
                price: '20',
                selected: false
            },
            {
                id: 3,
                name: '',
                price: '100',
                selected: false
            }
        ];

        this.price = 150;
    }

    columns = [
        {
            dataField: 'id',
            text: 'Номер'
        },
        {
            dataField: 'name',
            text: 'Название'
        },
        {
            dataField: 'price',
            text: 'Стоимость'
        },
    ];

    selectRow = {
        mode: 'checkbox',
        onSelect: (row, isSelect, _, __) => {
            this.products[row.id - 1].selected = isSelect;
            console.log(this.products);
        },
        onSelectAll: (isSelect, _, __) => {
            this.products.forEach(item => {
                item.selected = isSelect;
            });
        },
    };

    bookObject() {
        this.setState({showBookingModal: false});
    }

    handleClose = () => {
        this.setState({showBookingModal: false});
    }

    calcSum() {
        let totalSum = this.price;

        this.products.forEach(val => {
            if (val.selected) {
                totalSum += parseInt(val.price);
            }
        });

        const oneDay = 24 * 60 * 60 * 1000;
        const dayCount = Math.round(Math.abs(((new Date(this.state.beginDate)) - (new Date(this.state.endDate))) / oneDay)) + 1;

        return totalSum * dayCount;
    }

    render() {
        return (
            <div>
                <Modal show = {this.state.showBookingModal} onHide = {this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Бронирование объекта</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Вы выбрали даты с {this.state.beginDate} по {this.state.endDate}
                        <br/>
                        Финальная сумма будет равна: {this.calcSum()} руб.
                        <br/>
                        Вы действительно хотите ЗАБРОНИРОВАТЬ объект?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant = 'danger' onClick = {this.handleClose}>
                            Нет
                        </Button>
                        <Button variant = 'secondary' onClick = {this.bookObject}>
                            Да
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show = {this.state.showBookingModalError} onHide = {() => { this.setState({showBookingModalError: false}) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Бронирование объекта</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Все поля дат должны быть заполнены верно!</Modal.Body>
                    <Modal.Footer>
                        <Button variant = 'secondary' onClick = {() => { this.setState({showBookingModalError: false}) }}>
                            Хорошо
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Header />

                <Container
                    style = {{
                        padding: 0,
                    }}
                >
                    <Container style = {{marginBottom: '1em'}}>
                        <h2 style = {{marginLeft: '-0.5em'}}>
                            Object Name Object Name
                        </h2>
                        <h2 style = {{marginLeft: '-0.5em'}}>
                            Стоимость: {this.price} руб/день
                        </h2>
                    </Container>

                    <Carousel
                        style = {{
                            marginBottom: '8px'
                        }}
                    >
                        <Carousel.Item>
                            <img
                                style = {{
                                    // width: '100px',
                                    height: ' 30em',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                    objectFit: 'cover'
                                }}
                                className = 'd-block w-100'
                                src = 'https://pro-spo.ru/images/stories/2014/elitefon.ru-38277.jpg'
                            />
                        </Carousel.Item>
                        <Carousel.Item
                            style = {{
                                height: '30em'
                            }}
                        >
                            <img
                                style = {{
                                    // width: '100px',
                                    height: ' 30em',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                    objectFit: 'cover'
                                }}
                                className = 'd-block w-100'
                                src = 'https://pro-spo.ru/images/stories/2014/elitefon.ru-38277.jpg'
                            />
                        </Carousel.Item>
                    </Carousel>
                </Container>

                <Container style = {{padding: 0, marginTop: '40px'}}>
                    <h2
                        style = {{
                            padding: 0,
                            marginLeft: '-0.5em'
                        }}
                    >
                        Описание
                    </h2>

                    <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                        <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                            На первый взгляд судно неплохое, в относительно хорошем состоянии, хотя и 92 года постройки. Экипаж 19 человек - 11 русских и 8 филиппинцев, включая повара.
                            Говорят, периодически становится тоскливо от егошних кулинарных изысков.
                            Филиппинцы здесь рядовой состав, за ними постоянно нужно следить чтобы не натворили чего, среди них только один матрос по-настоящему ответственный и с руками из нужного места, все понимает с полуслова. Остальные - типичные Равшаны да Джамшуты.
                            А еще один из них - гомосек О___о, в добавок к этому он опасный человек, в том плане, что легко впадает в состояние ступора и отключает мозг: был случай как он закрыл одного матроса в трюме, тот орал и тарабанил внутри, это заметил боцман,
                            начал орать на этого персонажа, который, в свою очередь испуганно выпучив глаза, трясущимися руками продолжал закручивать барашки. В итоге боцман его отодвинул и выпустил матроса из трюма.
                            Общение на английском языке, но из-за акцента не всегда с первого раз понятно что филиппинцы говорят, особенно по рации.
                            <br />
                            Напимер, говорит он тебе: Бикарпуль! Бикарпуль! А потом, когда уже поздно, выясняется что это было "Be careful!"
                        </ListGroup.Item>
                    </ListGroup>
                </Container>

                <Container style = {{padding: 0}}>
                    <h2
                        style = {{
                            padding: 0,
                            marginLeft: '-0.5em'
                        }}
                    >
                         Условия:
                    </h2>

                    <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    </ListGroup>
                </Container>

                <Container style = {{padding: 0}}>
                    <h2
                        style = {{
                            padding: 0,
                            marginLeft: '-0.5em'
                        }}
                    >
                        Забронировать:
                    </h2>

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
                        <Col>
                            <p style = {{textAlign: 'center'}}>Дата окончания</p>
                            <Form onSubmit={() => { console.log('IM HERE') }}>
                                <Form.Control
                                    onChange={(event) => {
                                        this.setState({endDate: event.target.value});
                                    }}
                                    value={this.state.endDate}
                                    type = 'date' name = 'endDate'
                                    style = {{
                                        width: '50%',
                                        marginTop: 0,
                                        marginRight: 'auto',
                                        marginBottom: 0,
                                        marginLeft: 'auto',
                                    }}
                                />
                            </Form>
                        </Col>
                    </Row>

                    <Row className = 'justify-content-md-center' style = {{marginBottom: '2em'}}>
                        <BootstrapTable
                            keyField = 'id'
                            columns = {this.columns}
                            selectRow = {this.selectRow}
                            data = {this.products}
                        />
                    </Row>

                    <Row className = 'justify-content-md-center'>
                        <Button
                            style = {{width: '50%'}} variant = 'secondary'
                            onClick={() => {
                                if (this.state.endDate === '' || this.state.beginDate === '' || this.state.beginDate === this.state.endDate ||
                                    (new Date(this.state.endDate) <= (new Date())) || (new Date(this.state.beginDate) <= (new Date()))
                                ) {
                                    this.setState({showBookingModalError: true});
                                    return;
                                }

                                this.setState({showBookingModal: true});
                            }}
                        >
                            Забронировать!
                        </Button>
                    </Row>
                </Container>

                <Container style = {{padding: 0}}>
                    <h2
                        style = {{
                            padding: 0,
                            marginLeft: '-0.5em'
                        }}
                    >
                         Отзывы:
                    </h2>

                    <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                        <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                            <Row>
                                <img
                                    className = 'objPic'
                                    src = 'http://sun9-22.userapi.com/s/v1/if1/H7Xnl4D-VUT3dx1UqHOkz6-Bdvp4Uo-hwnR9V9Ax-UuqVOmHtpUjp3w-bzmXL7lH2ChaBjxC.jpg?size=200x0&quality=96&crop=0,0,960,960&ava=1'
                                    alt = 'object pic'
                                />
                                <Col>
                                    <h4>User name</h4>
                                    <p className = 'objInnerText'>Дата создания: 10-01-2020</p>
                                    <p className = 'objInnerText'>Оценка: 8 из 10</p>
                                    <p className = 'objInnerText'>Напимер, говорит он тебе: Бикарпуль! Бикарпуль! А потом, когда уже поздно, выясняется что это было "Be careful!"</p>
                                </Col>

                                <button className = 'threeDotButton'>
                                    <Icon icon = {threeDotsVertical} />
                                </button>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
            </div>
        );
    }
}
