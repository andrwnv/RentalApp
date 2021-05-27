import React from 'react';
import { Container, Button, Col, Row, ListGroup, Modal, Carousel, Form, NavLink, NavDropdown } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { Icon } from '@iconify/react';

import api from '../../services/api';
import Cookies from '../../services/cookies';

import threeDotsVertical from '@iconify-icons/bi/three-dots-vertical';
import Header from '../../components/Header/Header';
import Rating from '@material-ui/lab/Rating';
import Select from 'react-select';


export default class ObjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.objectId = this.props.match.params.objectId;

        this.state = {
            features: [],
            showBookingModal: false,
            showBookingModalError: false,
            endDate: '',
            beginDate: '',
            name: '',
            desc: '',
            price: 150,
            route: '',
            rating: 0,
            reportModal: false,
            reasons: [],
            selectedReason: null
        }

        this.history = props.history;
        this.counter = 1;
        this.carouselItems = [];
        this.comfortProps = [];
        this.products = [];

        this.header = {
            headers: {
                'token': Cookies.get('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        api.get(`http://localhost:3080/rent_ads/${this.objectId}`, this.header).then(res => {
            const objectData = res.data.data;

            if( objectData.additionalComfortProps ) {
                this.products = [];
                objectData.additionalComfortProps.forEach(data => {
                    this.products.push(data);
                });
            }

            if( objectData.mediaLinks.urls.length !== 0 ) {
                this.carouselItems = [];
                objectData.mediaLinks.urls.forEach((val, _) => {
                    this.carouselItems.push(
                        <Carousel.Item>
                            <img
                                style = {{
                                    height: ' 30em',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                    objectFit: 'cover'
                                }}
                                className = 'd-block w-100'
                                src = {val}
                                alt = 'carousel_image'
                            />
                        </Carousel.Item>
                    );
                });
            }

            if( objectData.comfortProps !== null ) {
                this.comfortProps = [];
                objectData.comfortProps.forEach((res, _) => {
                    this.comfortProps.push(
                        <ListGroup.Item>{res}</ListGroup.Item>
                    );
                });
            }

            this.setState({
                name: objectData.title,
                desc: objectData.description,
                price: objectData.price,
                route: `${objectData.objectType.typeName}: ${objectData.country.name}, ${objectData.localityType.name} ${objectData.locality.name}, ${objectData.street.name} ${objectData.houseNumber} ${objectData.apartmentNumber ? ' кв. ' + objectData.apartmentNumber : ''} ${objectData.buildingTowerNumber ? ' ст. ' + objectData.buildingTowerNumber : ''}`,
                rating: objectData.rating
            });
        }).catch(err => {
            console.log(err);
        });
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

    bookObject = () => {
        const header = {
            headers: {
                'token': Cookies.get('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const data = {
            beginDate: this.state.beginDate,
            endDate: this.state.endDate,
            objectId: this.objectId
        };

        api.post('http://localhost:3080/booking/', data, header).then(_ => {
            if (this.products.length === 0) {
                this.setState({showBookingModal: false});
                alert('Бронь создана!');

                return;
            }

            this.products.forEach(res => {
                console.log(res);
                const _data = {
                    name: res.name,
                    description: "",
                    price: parseInt(res.price),
                    bookingId: _.data.data.id
                };

                api.post('http://localhost:3080/booking/additional_comfort', _data, header).then();
            });

            this.setState({showBookingModal: false});
            alert('Бронь создана!');
        }).catch(_ => {
            this.setState({showBookingModal: false});
            alert('Упс, что-то пошло не так!');
        });
    }

    handleClose = () => {
        this.setState({showBookingModal: false});
    }

    calcSum() {
        let totalSum = this.state.price;

        this.products.forEach(val => {
            if( val.selected ) {
                totalSum += parseInt(val.price);
            }
        });

        const oneDay = 24 * 60 * 60 * 1000;
        const dayCount = Math.round(Math.abs(((new Date(this.state.beginDate)) - (new Date(this.state.endDate))) / oneDay)) + 1;

        return totalSum * dayCount;
    }

    componentDidMount() {
        this.loadReasons();
    }

    sendReport = () => {
        this.setState({reportModal: false});
    }

    loadReasons = () => {
        const header = {
            headers: {
                'token': Cookies.get('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        api.get('http://localhost:3080/report/reasons', header).then(res => {
            console.log(res);

            const data = [];
            res.data.data.forEach(reason => {
                data.push({
                    label: reason.name,
                    value: reason.description
                });
            });

            this.setState({reasons: data});
        });
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
                        <br />
                        Финальная сумма будет равна: {this.calcSum()} руб.
                        <br />
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

                <Modal
                    show = {this.state.showBookingModalError} onHide = {() => {
                    this.setState({showBookingModalError: false})
                }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Бронирование объекта</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Все поля дат должны быть заполнены не верно!</Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant = 'secondary' onClick = {() => {
                            this.setState({showBookingModalError: false})
                        }}
                        >
                            Хорошо
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show = {this.state.reportModal} onHide = { () => {this.setState({reportModal: false})} }>
                    <Modal.Header closeButton>
                        <Modal.Title>Жалоба</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Выберите причину</Modal.Body>
                    <Modal.Body>
                        <Select
                            options = {this.state.reasons}
                            id = 'localityType'
                            placeholder = {'Выберите причину...'}
                            onChange = {event => {
                                this.setState({selectedReason: event});
                            }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant = 'secondary' onClick = { this.sendReport }>
                            Пожаловаться
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
                            {this.state.name}
                        </h2>
                        <Rating
                            style = {{marginLeft: '-0.5em', marginBottom: '0.5em'}} name = 'size-small'
                            value = {this.state.rating} max = {10} size = 'large' readOnly
                        />
                        <p style = {{marginLeft: '-0.8em'}}>{this.state.route}</p>
                        <h2 style = {{marginLeft: '-0.5em'}}>
                            Стоимость: {this.state.price} руб/день
                        </h2>
                    </Container>

                    <Carousel
                        style = {{
                            marginBottom: '8px'
                        }}
                    >
                        {this.carouselItems.length === 0 ? <h2>Картинок объекта нет</h2> : this.carouselItems}
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
                            {this.state.desc === '' ? 'Владелец не добавил описание' : this.state.desc}
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
                        {this.comfortProps.length === 0 ? <ListGroup.Item
                            style = {{marginLeft: '-0.8em'}}
                        >Владелец не указал условия</ListGroup.Item> : this.comfortProps}
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
                            <Form
                                onSubmit = {() => {
                                    console.log('IM HERE')
                                }}
                            >
                                <Form.Control
                                    onChange = {(event) => {
                                        this.setState({endDate: event.target.value});
                                    }}
                                    value = {this.state.endDate}
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

                    {this.products.length === 0
                        ? <div />
                        : <Row className = 'justify-content-md-center' style = {{marginBottom: '2em'}}>
                                <BootstrapTable
                                    keyField = 'id'
                                    columns = {this.columns}
                                    selectRow = {this.selectRow}
                                    data = {this.products}
                                />
                            </Row>
                    }

                    <Row className = 'justify-content-md-center'>
                        <Button
                            style = {{width: '50%'}} variant = 'secondary'
                            onClick = {() => {
                                if( this.state.endDate === '' || this.state.beginDate === '' || this.state.beginDate === this.state.endDate ||
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
                                    src = 'https://sun9-22.userapi.com/s/v1/if1/H7Xnl4D-VUT3dx1UqHOkz6-Bdvp4Uo-hwnR9V9Ax-UuqVOmHtpUjp3w-bzmXL7lH2ChaBjxC.jpg?size=200x0&quality=96&crop=0,0,960,960&ava=1'
                                    alt = 'object pic'
                                />
                                <Col>
                                    <h4>User name</h4>
                                    <p className = 'objInnerText'>Дата создания: 10-01-2020</p>
                                    <p className = 'objInnerText'>Оценка:
                                        <Rating
                                            style = {{marginLeft: '0.5em'}} name = 'size-small'
                                            value = {7} max = {10} size = 'small' readOnly
                                        />
                                    </p>
                                    <p className = 'objInnerText'>Напимер, говорит он тебе: Бикарпуль! Бикарпуль! А потом, когда уже поздно, выясняется что это было "Be careful!"</p>
                                </Col>

                                <NavDropdown
                                        title = {<div style = {{display: 'inline-block'}}> <Icon
                                            icon = {threeDotsVertical}
                                        /> </div>} id = 'basic-nav-dropdown'
                                    >
                                    <NavLink eventKey = {3.1} onSelect={() => { this.setState({reportModal: true}) }}>Пожаловаться</NavLink>
                                </NavDropdown>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
            </div>
        );
    }
}
