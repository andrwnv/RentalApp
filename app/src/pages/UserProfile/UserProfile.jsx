import React from 'react';
import { Container, Button, Col, Row, ListGroup, Modal, NavDropdown, NavLink, Form } from 'react-bootstrap';

import { Icon } from '@iconify/react';
import Rating from '@material-ui/lab/Rating';
import threeDotsVertical from '@iconify-icons/bi/three-dots-vertical';

import Header from '../../components/Header/Header';
import './UserProfile.css';

import Cookies from '../../services/cookies';
import api from '../../services/api';
import cookies from '../../services/cookies';
import Select from 'react-select';

const FileSaver = require('file-saver');


export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteModal: false,
            showPicChangeModal: false,
            addRatingModal: false,
            userProfilePic: 'https://res.cloudinary.com/rentalappclone/image/upload/v1619861491/default_avatar.png',
            firstName: '',
            lastName: '',
            userRating: 0,
            userObjects: [],
            reservations: [],
            waitingBookingConfirm: [],
            confirmedBooking: [],
            userID: 0,
            rentHistory: [],
            bookingHistory: [],
            rentedNow: [],
            userRentNow: [],
            selectedRatingReview: 0,
            reviews: [],
            reportModal: false
        }

        this.history = props.history;
        this.newUserPic = null;
    }

    sendReport = () => {
        this.setState({reportModal: false});
    }

    sendRating = () => {
        this.setState({addRatingModal: false});
    }

    userMoving = (userBookingData) => {
        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: `${token}`
        };

        const data = {
            bookingId: userBookingData.id
        };

        api.post('http://localhost:3080/rent', data, {headers}).then(res => {
            const data = {bookingId: userBookingData.id, rentId: res.data.data.id};
            console.log(res.data.data.id);
            api.patch('http://localhost:3080/booking/additional_comfort', data, {headers}).then();

            api.post('http://localhost:3080/booking/move_to_history', data, {headers}).then(_ => {
               api.delete('http://localhost:3080/booking', {headers, data});
            });
        });

        this.getDataFromAPI();
    }

    userLeave = (userRentalData) => {
        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: `${token}`
        };

        const data = {
            rentId: userRentalData.id
        };

        api.post('http://localhost:3080/rent/move_to_history', data, {headers}).then(_ => {
            api.delete('http://localhost:3080/rent', {headers, data});
        });

        this.getDataFromAPI();
    }

    getDataFromAPI = () => {
        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: `${token}`
        };

        this.state.userObjects = [];
        this.state.reservations = [];
        this.state.confirmedBooking = [];
        this.state.waitingBookingConfirm = [];

        api.get('http://localhost:3080/client/current_user', {headers}).then(res => {
            this.setState({
                userProfilePic: res.data.data.photoLink,
                firstName: res.data.data.firstName,
                lastName: res.data.data.lastName,
                userRating: res.data.data.rating,
                userID: res.data.data.id
            });

            this.loadReviews();
        });

        api.get('http://localhost:3080/rent_ads/user_ads', {headers}).then(res => {
            res.data.data.forEach(async object => {
                const booking_results = (await api.get(`http://localhost:3080/booking/${object.id}`, {headers})).data.data;
                if( booking_results.length > 0 ) {
                    booking_results.forEach(booking_res => {
                        api.get(`http://localhost:3080/booking/additional_comfort?bookingId=${booking_res.id}&rentId=`, {headers}).then(res => {
                            let additionals = [];
                            res.data.data.forEach(additional => {
                                additionals.push(
                                    <li>{additional.nameOfComfort} (Стоимость: {additional.price} руб.)</li>
                                );
                            });

                            if( booking_res.confirmed ) {
                                this.setState({
                                    confirmedBooking: this.state.confirmedBooking.concat([
                                        <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                                        <Row>
                                            <img
                                                className = 'objPic'
                                                style={{ width: '9em', height: '9em' }}
                                                src = {object.mediaLinks.urls.length !== 0 ? `${object.mediaLinks.urls[0]}`
                                                    : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
                                                alt = 'object pic'
                                            />
                                            <Col>
                                                <h4>{object.title}</h4>
                                                <p className = 'objInnerText'>Желаемые даты: c {booking_res.beginDate} по {booking_res.endDate}</p>
                                                <p className = 'objInnerText'>Клиент: {booking_res.client.firstName} {booking_res.client.lastName}</p>
                                                {
                                                    additionals.length === 0 ? <></> : <ol style={{marginLeft: '1em'}}> {additionals} </ol>
                                                }
                                            </Col>

                                            <div className = 'buttonsGroup'>
                                                <Button
                                                    variant = 'danger' style = {{marginBottom: '5px'}} onClick = {() => {
                                                    const token = Cookies.get('token');
                                                    const headers = {
                                                        'Content-Type': 'application/json',
                                                        Accept: 'application/json',
                                                        token: `${token}`
                                                    };

                                                    const data = {bookingId: booking_res.id};

                                                    api.delete('http://localhost:3080/booking', {headers, data}).then(() => {
                                                        this.getDataFromAPI();
                                                    });
                                                }}
                                                >
                                                    Отменить
                                                </Button>
                                                <Button
                                                    variant = 'dark' style = {{marginTop: '5px', marginBottom: '5px'}} onClick = {() => {
                                                    this.downloadLease(booking_res.object.id, booking_res.client.id);
                                                }}
                                                >
                                                    Скачать договор
                                                </Button>
                                                <Button variant = 'dark' style={{marginTop: '5px'}} onClick={() => { this.userMoving(booking_res); }}> Заселён </Button>
                                            </div>
                                        </Row>
                                    </ListGroup.Item>
                                    ])
                                });
                            } else {
                                this.setState({
                                    waitingBookingConfirm: this.state.waitingBookingConfirm.concat([
                                        <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                                        <Row>
                                            <img
                                                className = 'objPic'
                                                src = {object.mediaLinks.urls.length !== 0 ? `${object.mediaLinks.urls[0]}`
                                                    : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
                                                alt = 'object pic'
                                            />
                                            <Col>
                                                <h4>{object.title}</h4>
                                                <p className = 'objInnerText'>Желаемые даты: c {booking_res.beginDate} по {booking_res.endDate}</p>
                                                <p className = 'objInnerText'>Клиент: {booking_res.client.firstName} {booking_res.client.lastName}</p>
                                                {
                                                    additionals.length === 0 ? <></> : <ol style={{marginLeft: '1em'}}> {additionals} </ol>
                                                }
                                            </Col>

                                            <div className = 'buttonsGroup'>
                                                <Button
                                                    style = {{marginBottom: '5px'}}
                                                    onClick = {() => {
                                                        const token = Cookies.get('token');
                                                        const headers = {
                                                            'Content-Type': 'application/json',
                                                            Accept: 'application/json',
                                                            token: `${token}`
                                                        };

                                                        const data = {bookingId: booking_res.id};

                                                        api.patch('http://localhost:3080/booking/confirm', data, {headers}).then(() => {
                                                            this.getDataFromAPI();
                                                        });
                                                    }}
                                                >
                                                    Подтвердить
                                                </Button>

                                                <Button
                                                    variant = 'danger' style = {{marginTop: '5px'}} onClick = {() => {
                                                    const token = Cookies.get('token');
                                                    const headers = {
                                                        'Content-Type': 'application/json',
                                                        Accept: 'application/json',
                                                        token: `${token}`
                                                    };

                                                    const data = {bookingId: booking_res.id};

                                                    api.delete('http://localhost:3080/booking', {headers, data}).then(() => {
                                                        this.getDataFromAPI();
                                                    });
                                                }}
                                                >
                                                    Отменить
                                                </Button>
                                            </div>
                                        </Row>
                                    </ListGroup.Item>
                                    ])
                                });
                            }
                        }).catch(err => {console.error(err)});
                    });
                }

                const rent_results = (await api.get(`http://localhost:3080/rent/${object.id}`, {headers})).data.data;
                if (rent_results.length > 0) {
                    rent_results.forEach(rent_res => {
                        api.get(`http://localhost:3080/booking/additional_comfort?rentId=${rent_res.id}`, {headers}).then(res => {
                            let additionals = [];

                            res.data.data.forEach(additional => {
                                console.log(additional.nameOfComfort);
                                additionals.push(
                                    <li>{additional.nameOfComfort} (Стоимость: {additional.price} руб.)</li>
                                );
                            });

                            this.setState({
                                rentedNow: this.state.rentedNow.concat([
                                    <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                                        <Row>
                                            <img
                                                className = 'objPic'
                                                style={{ width: '9em', height: '9em' }}
                                                src = {object.mediaLinks.urls.length !== 0 ? `${object.mediaLinks.urls[0]}`
                                                    : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
                                                alt = 'object pic'
                                            />
                                            <Col>
                                                <h4>{object.title}</h4>
                                                <p className = 'objInnerText'>Даты: c {rent_res.beginDate} по {rent_res.endDate}</p>
                                                <p className = 'objInnerText'>Клиент: {rent_res.client.firstName} {rent_res.client.lastName}</p>
                                                {
                                                    additionals.length === 0 ? <></> : <ol style={{marginLeft: '1em'}}> {additionals} </ol>
                                                }
                                            </Col>

                                            <div className = 'buttonsGroup'>
                                                <NavDropdown
                                                    title = {<div style = {{display: 'inline-block'}}> <Icon
                                                        icon = {threeDotsVertical}
                                                    /> </div>} id = 'basic-nav-dropdown' style={{left: '85%'}}>
                                                    <NavLink eventKey = {3.1} href = {`/ad/${object.id}`}>Объявление</NavLink>
                                                    <NavLink eventKey = {3.2} onSelect={() => { this.setState({addRatingModal: true}) }} >Добавить отзыв</NavLink>
                                                </NavDropdown>
                                                <Button variant = 'dark' style={{marginTop: '5px'}} onClick={() => { this.userLeave(rent_res); }}> Выселен </Button>
                                            </div>
                                        </Row>
                                    </ListGroup.Item>
                                ])
                            });
                        });
                    });

                    this.setState({
                        userObjects: this.state.userObjects.concat(
                            [
                                <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                                <Row>
                                    <img
                                        className = 'objPic'
                                        src = {object.mediaLinks.urls.length !== 0 ? `${object.mediaLinks.urls[0]}`
                                            : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
                                        alt = 'object pic'
                                    />
                                    <Col>
                                        <h4>{object.title}</h4>
                                        <p className = 'objInnerText'>Дата создания: {new Date(object.createDate).toDateString()}</p>
                                        <Rating name = 'size-small' value = {object.rating} max = {10} readOnly />
                                    </Col>

                                    <NavDropdown
                                        title = {<div style = {{display: 'inline-block'}}> <Icon
                                            icon = {threeDotsVertical}
                                        /> </div>} id = 'basic-nav-dropdown'
                                    >
                                        <NavLink eventKey = {3.1} href = {`/ad/${object.id}`}>Объявление</NavLink>
                                        <NavLink
                                            eventKey = {3.2} onSelect = {() => {
                                            const data = {objectId: object.id};
                                            api.delete('http://localhost:3080/rent_ads/', {headers, data})
                                                .catch(err => {
                                                    console.log(err);
                                                });
                                        }}
                                        >
                                            Удалить
                                        </NavLink>
                                    </NavDropdown>
                                </Row>
                            </ListGroup.Item>
                            ]
                        )
                    });
                }
            });
        });

        api.get('http://localhost:3080/booking', {headers}).then(res => {
            let reservations = [];

            res.data.data.forEach(reservation => {
                reservations.push(
                    <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                        <Row>
                            <img
                                className = 'objPic'
                                src = {reservation.object.mediaLinks.urls.length !== 0
                                    ? reservation.object.mediaLinks.urls[0]
                                    : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
                                alt = 'object pic'
                            />
                            <Col>
                                <h4>{reservation.object.title}</h4>
                                <p className = 'objInnerText'>Дата брони: {reservation.beginDate} по {reservation.endDate}</p>
                                <p className = 'objInnerText'>Оценка объекта: <Rating
                                    name = 'size-small' value = {reservation.object.rating} max = {10} readOnly
                                /></p>
                                <p className = 'objInnerText'>{reservation.confirmed ? 'Бронь подтверждена' : 'Бронь не подтверждена'}</p>
                            </Col>

                            <NavDropdown
                                title = {<div style = {{display: 'inline-block'}}> <Icon
                                    icon = {threeDotsVertical}
                                /> </div>} id = 'basic-nav-dropdown'
                            >
                                <NavLink eventKey = {3.1} href = {`/ad/${reservation.object.id}`}>Объявление</NavLink>
                                <NavLink
                                    eventKey = {3.2} onSelect = {() => {
                                        this.downloadLease(reservation.object.id, this.state.userID);
                                }}
                                >Скачать договор</NavLink>
                            </NavDropdown>
                        </Row>
                    </ListGroup.Item>
                );
            });

            this.setState({reservations: reservations});
        });
    };

    componentDidMount() {
        this.getDataFromAPI();

        this.loadBookingHistory();
        this.loadRentHistory();
        this.loadRentNow();
    }

    handleClose = () => {
        this.setState({showDeleteModal: false});
    }

    downloadLease = (landId, clientID) => {
        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/pdf',
            Accept: 'application/json',
            token: `${token}`
        };

        const data = {land_id: landId, client_id: clientID};

        api.request({
            url: 'http://localhost:3080/client/create_lease',
            method: 'GET',
            params: data,
            headers: headers,
            responseType: 'blob', // important
        }).then((response) => {
            let blob = new Blob([response.data]);
            FileSaver.saveAs(blob, `lease_${Math.random()}.pdf`);
        });
    }

    openDeleteModal = () => {
        this.setState({showDeleteModal: true});
    }

    deleteAccount = () => {
        this.setState({showDeleteModal: false});

        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: `${token}`
        };

        api.delete('http://localhost:3080/client/delete', {headers}).then(_ => {
            cookies.remove('token', {path: '/'});
            this.history.push('/');
        }).catch(err => {
            console.log(err);
        });
    }

    loadNewUserPicModal = () => {
        if( this.newUserPic === null ) {
            alert('Вы не выбрали файл!');
            return;
        }

        let formData = new FormData();
        formData.append('avatar', this.newUserPic[0]);

        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: `${token}`
        };

        api.post('http://localhost:3080/client/upload_avatar', formData, {headers}).then(_ => {
            alert('Файл отправлен!');
        });

        this.setState({showPicChangeModal: false});
    }

    loadBookingHistory = () => {
        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: `${token}`
        };

        api.get('http://localhost:3080/booking/history', {headers}).then(res => {
            if (res.data.data.length === 0) {
                this.setState({ bookingHistory: [<ListGroup.Item style = {{marginLeft: '-0.8em'}}>Здесь пока что пусто</ListGroup.Item>] });
                return;
            }

            let history = [];
            res.data.data.forEach(item => {
                history.push(
                    <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                        <Row>
                            <img
                                className = 'objPic'
                                src = {item.object.mediaLinks.urls.length !== 0 ? `${item.object.mediaLinks.urls[0]}`
                                    : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
                                alt = 'object pic'
                            />
                            <Col>
                                <h4>{item.object.title}</h4>
                                <p className = 'objInnerText'>Даты бронирования: {item.beginDate} по {item.endDate}</p>
                                <p className = 'objInnerText'>Оценка арендодателя: <Rating
                                    name = 'size-small' value = {7} max = {10} readOnly
                                /></p>
                                <p className = 'objInnerText'>Ваша оценка: <Rating
                                    name = 'size-small' value = {8} max = {10} readOnly
                                /></p>
                            </Col>

                            <NavDropdown
                                title = {<div style = {{display: 'inline-block'}}> <Icon
                                    icon = {threeDotsVertical}
                                /> </div>} id = 'basic-nav-dropdown'
                            >
                                <NavLink eventKey = {3.1} href={`/ad/${item.object.id}`}>Объявление</NavLink>
                                <NavLink eventKey = {3.2} onSelect={() => { this.setState({addRatingModal: true}) }}  >Добавить отзыв</NavLink>
                            </NavDropdown>
                        </Row>
                    </ListGroup.Item>
                );
            });

            this.setState({bookingHistory: history});
        });
    }

    loadRentHistory = () => {
        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: `${token}`
        };

        api.get('http://localhost:3080/rent/history', {headers}).then(res => {
            if (res.data.data.length === 0) {
                this.setState({ rentHistory: [<ListGroup.Item style = {{marginLeft: '-0.8em'}}>Здесь пока что пусто</ListGroup.Item>] });
                return;
            }

            let history = [];
            res.data.data.forEach(item => {
                history.push(
                    <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                        <Row>
                            <img
                                className = 'objPic'
                                src = {item.object.mediaLinks.urls.length !== 0 ? `${item.object.mediaLinks.urls[0]}`
                                    : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
                                alt = 'object pic'
                            />
                            <Col>
                                <h4>{item.object.title}</h4>
                                <p className = 'objInnerText'>Даты аренды: {item.beginDate} по {item.endDate}</p>
                                <p className = 'objInnerText'>Оценка арендодателя: <Rating
                                    name = 'size-small' value = {7} max = {10} readOnly
                                /></p>
                                <p className = 'objInnerText'>Ваша оценка: <Rating
                                    name = 'size-small' value = {8} max = {10} readOnly
                                /></p>
                            </Col>

                            <NavDropdown
                                title = {<div style = {{display: 'inline-block'}}> <Icon
                                    icon = {threeDotsVertical}
                                /> </div>} id = 'basic-nav-dropdown'
                            >
                                <NavLink eventKey = {3.1} href={`/ad/${item.object.id}`}>Объявление</NavLink>
                                <NavLink eventKey = {3.2} onSelect={() => { this.setState({addRatingModal: true}) }}>Добавить отзыв</NavLink>
                            </NavDropdown>
                        </Row>
                    </ListGroup.Item>
                );
            });

            this.setState({rentHistory: history});
        });
    }

    loadRentNow = () => {
        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: `${token}`
        };

        api.get('http://localhost:3080/rent/now', {headers}).then(res => {
            if (res.data.data.length === 0) {
                this.setState({ rentHistory: [<ListGroup.Item style = {{marginLeft: '-0.8em'}}>Здесь пока что пусто</ListGroup.Item>] });
                return;
            }

            let history = [];
            res.data.data.forEach(item => {
                history.push(
                    <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                        <Row>
                            <img
                                className = 'objPic'
                                src = {item.object.mediaLinks.urls.length !== 0 ? `${item.object.mediaLinks.urls[0]}`
                                    : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'}
                                alt = 'object pic'
                            />
                            <Col>
                                <h4>{item.object.title}</h4>
                                <p className = 'objInnerText'>Даты аренды: {item.beginDate} по {item.endDate}</p>
                            </Col>

                            <NavDropdown
                                title = {<div style = {{display: 'inline-block'}}> <Icon
                                    icon = {threeDotsVertical}
                                /> </div>} id = 'basic-nav-dropdown'
                            >
                                <NavLink eventKey = {3.1} href={`/ad/${item.object.id}`}>Объявление</NavLink>
                            </NavDropdown>
                        </Row>
                    </ListGroup.Item>
                );
            });

            this.setState({userRentNow: history});
        });
    }

    loadReviews = () => {
        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: `${token}`
        };

        api.get(`http://localhost:3080/rating/client_review?client=${this.state.userID}&isForLord=false`, {headers}).then(res => {
            let data = [];

            res.data.data.forEach(review => {
                const date = new Date(review.createdAt);
                let dd = String(date.getDate()).padStart(2, '0');
                let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = date.getFullYear();

                data.push(
                    <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                            <Row>
                                <img
                                    className = 'objPic'
                                    src = {review.client.photoLink}
                                    alt = 'object pic'
                                />
                                <Col>
                                    <h4>{review.client.firstName} {review.client.lastName}</h4>
                                    <p className = 'objInnerText'>Дата создания: {yyyy}-{mm}-{dd}</p>
                                    <p className = 'objInnerText'>Оценка:
                                        <Rating
                                            style = {{marginLeft: '0.5em'}} name = 'size-small'
                                            value = {review.rating} max = {10} size = 'small' readOnly
                                        />
                                    </p>
                                    <p className = 'objInnerText'>{review.review}</p>
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
                );
            });

            this.setState({reviews: data});
        });
    }

    render() {
        return (
            <div>
                <Modal show = {this.state.showDeleteModal} onHide = {this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Удаление аккаунта</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы действительно хотите УДАЛИТЬ аккаунт?</Modal.Body>
                    <Modal.Footer>
                        <Button variant = 'secondary' onClick = {this.handleClose}>
                            Нет
                        </Button>
                        <Button variant = 'danger' onClick = {this.deleteAccount}>
                            Да
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show = {this.state.showPicChangeModal} onHide = {() => {
                    this.setState({showPicChangeModal: false});
                }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Изменение аватарки</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Выберите файл</p>
                           <input
                               type = 'file'
                               onChange = {event => {
                                   this.newUserPic = event.target.files;
                               }}
                           />

                        <Button variant = 'secondary' onClick = {this.loadNewUserPicModal}>
                            Обновить
                        </Button>
                    </Modal.Body>
                </Modal>

                <Modal show = {this.state.addRatingModal} onHide = { () => {this.setState({addRatingModal: false})} }>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавление отзыва</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Добавьте оценку и отзыв</Modal.Body>
                    <Modal.Body>
                        <Form.Label>Оценка</Form.Label>
                        <Rating
                            name = 'size-small' value = {this.state.selectedRatingReview} max = {10} size = 'large'
                            onChange={(_, newValue) => {
                                this.setState({selectedRatingReview: newValue});
                            }}
                        />
                        <br/>
                        <Form.Label>Отзыв</Form.Label>
                        <Form.Control as="textarea" rows={3} cols={5} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant = 'secondary' onClick = { this.sendRating }>
                            Отправить
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
                    <Row>
                        <div style = {{width: '15em'}}>
                            <img
                                src = {this.state.userProfilePic}
                                className = 'userPic'
                                alt = 'user_profile_image'
                            />

                            <Button
                                style = {{width: '100%', marginBottom: '5px'}} variant = 'secondary' onClick = {() => {
                                this.setState({showPicChangeModal: true});
                            }}
                            >
                                Изменить аватар
                            </Button>
                        </div>
                        <Col>
                            <h3>{this.state.firstName} {this.state.lastName}</h3>
                            <h4>Рейтинг:</h4>
                            <Rating
                                name = 'size-small' value = {this.state.userRating} max = {10} size = 'large' readOnly
                            />
                        </Col>

                        <Button style = {{width: '15%'}} variant = 'danger' onClick = {this.openDeleteModal}>
                            Удалить аккаунт
                        </Button>
                    </Row>
                </Container>

                <Container style = {{padding: 0, marginTop: '40px'}}>
                    <h2
                        style = {{
                            padding: 0,
                            marginLeft: '-0.5em'
                        }}
                    >
                        Ваши объявления:
                    </h2>

                    <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                        {this.state.userObjects.length === 0
                            ? <ListGroup.Item style = {{marginLeft: '-0.8em'}}>Здесь пока что пусто</ListGroup.Item>
                            : this.state.userObjects
                        }

                    </ListGroup>
                </Container>

                <Container style = {{padding: 0}}>
                    <h2
                        style = {{
                            padding: 0,
                            marginLeft: '-0.5em'
                        }}
                    >
                        Забронированы вами:
                    </h2>

                    <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                        {this.state.reservations.length === 0
                            ? <ListGroup.Item style = {{marginLeft: '-0.8em'}}>Здесь пока что пусто</ListGroup.Item>
                            : this.state.reservations}

                    </ListGroup>
                </Container>

                <Container style = {{padding: 0}}>
                    <h2
                        style = {{
                            padding: 0,
                            marginLeft: '-0.5em'
                        }}
                    >
                        Арендованы вами:
                    </h2>

                    <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                        {this.state.userRentNow}
                    </ListGroup>
                </Container>

                <Container style = {{padding: 0}}>
                    <h2
                        style = {{
                            padding: 0,
                            marginLeft: '-0.5em'
                        }}
                    >
                         История бронирования:
                    </h2>

                    <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                        {this.state.bookingHistory}
                    </ListGroup>
                </Container>

                <Container style = {{padding: 0}}>
                    <h2
                        style = {{
                            padding: 0,
                            marginLeft: '-0.5em'
                        }}
                    >
                         История аренды:
                    </h2>

                    <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                        {this.state.rentHistory}
                    </ListGroup>
                </Container>

                <Container style = {{padding: 0}}>
                    <h2
                        style = {{
                            padding: 0,
                            marginLeft: '-0.5em'
                        }}
                    >
                        Отзывы о вас:
                    </h2>

                    <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                        { this.state.reviews.length === 0 ? <ListGroup.Item style = {{marginLeft: '-0.8em'}}>Здесь пока что пусто</ListGroup.Item>
                                                          :  this.state.reviews }
                    </ListGroup>
                </Container>

                {this.state.userObjects.length === 0 ? <div> </div>
                    :
                    <div>
                        <Container style = {{padding: 0}}>
                            <h2
                                style = {{
                                    padding: 0,
                                    marginLeft: '-0.5em'
                                }}
                            >
                                Брони ожидающие подтеждения:
                            </h2>

                            <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                                {this.state.waitingBookingConfirm.length === 0
                                    ? <ListGroup.Item
                                        style = {{marginLeft: '-0.8em'}}
                                    >Здесь пока что пусто</ListGroup.Item>
                                    : this.state.waitingBookingConfirm
                                }
                            </ListGroup>
                        </Container>

                        <Container style = {{padding: 0}}>
                            <h2
                                style = {{
                                    padding: 0,
                                    marginLeft: '-0.5em'
                                }}
                            >
                            Брони подтвержденные Вами:
                            </h2>

                            <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                                {this.state.confirmedBooking.length === 0
                                    ? <ListGroup.Item
                                        style = {{marginLeft: '-0.8em'}}
                                    >Здесь пока что пусто</ListGroup.Item>
                                    : this.state.confirmedBooking
                                }
                            </ListGroup>
                        </Container>
                    </div>
                }

                {this.state.userObjects.length === 0 ? <div> </div>
                    :
                    <div>
                        <Container style = {{padding: 0}}>
                            <h2
                                style = {{
                                    padding: 0,
                                    marginLeft: '-0.5em'
                                }}
                            >
                                Арендованы сейчас:
                            </h2>

                            <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                                {this.state.rentedNow.length === 0
                                    ? <ListGroup.Item
                                        style = {{marginLeft: '-0.8em'}}
                                    >Здесь пока что пусто</ListGroup.Item>
                                    : this.state.rentedNow
                                }
                            </ListGroup>
                        </Container>
                    </div>
                }
            </div>
        );
    }
}

