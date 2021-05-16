import React from 'react';
import { Container, Button, Col, Row, ListGroup, Modal, Form } from 'react-bootstrap';

import { Icon } from '@iconify/react';
import threeDotsVertical from '@iconify-icons/bi/three-dots-vertical';

import Header from '../../components/Header/Header';
import './UserProfile.css';

import Cookies from '../../services/cookies';
import api from '../../services/api';

import { Link } from '@material-ui/core';


const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <a
        href = ''
        ref = {ref}
        onClick = {e => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <Icon icon = {threeDotsVertical} />
  </a>
));

// {/*<Dropdown>*/}
// {/*    <Dropdown.Toggle as={CustomToggle} />*/}
//
// {/*    <Dropdown.Menu>*/}
// {/*        <Dropdown.Item href = '#/action-1'>Action</Dropdown.Item>*/}
// {/*        <Dropdown.Item href = '#/action-2'>Another action</Dropdown.Item>*/}
// {/*        <Dropdown.Item href = '#/action-3'>Something else</Dropdown.Item>*/}
// {/*    </Dropdown.Menu>*/}
// {/*</Dropdown>*/}


export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteModal: false,
            showPicChangeModal: false,
            userProfilePic: 'https://res.cloudinary.com/rentalappclone/image/upload/v1619861491/default_avatar.png',
            firstName: '',
            lastName: '',
            userRating: 0
        }

        this.history = props.history;
        this.newUserPic = null;

        const token = Cookies.get('token');
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            token: `${token}`
        };

        api.get('http://localhost:3080/client/current_user', {headers}).then(res => {
            this.setState({
                userProfilePic: res.data.data.photoLink,
                firstName: res.data.data.firstName,
                lastName: res.data.data.lastName,
                userRating: res.data.data.rating
            });
        });
    }

    handleClose = () => {
        this.setState({showDeleteModal: false});
    }

    openDeleteModal = () => {
        this.setState({showDeleteModal: true});
    }

    deleteAccount = () => {
        this.setState({showDeleteModal: false});
        Cookies.remove('token', {path: '/', domain: 'http://localhost:3000'});
        this.history.push('/');
    }

    loadNewUserPicModal = () => {
        if (this.newUserPic === null) {
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

                        <Button variant = 'secondary' onClick={this.loadNewUserPicModal}>
                            Обновить
                        </Button>
                    </Modal.Body>
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
                            <h4>Рейтинг: {this.state.userRating} из 10</h4>
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
                        <ListGroup.Item style = {{marginLeft: '-0.8em'}}>Здесь пока что пусто</ListGroup.Item>
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
                        <ListGroup.Item style = {{marginLeft: '-0.8em'}}>Здесь пока что пусто</ListGroup.Item>
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
                        <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                            <Row>
                                <img
                                    className = 'objPic'
                                    src = 'http://sun9-22.userapi.com/s/v1/if1/H7Xnl4D-VUT3dx1UqHOkz6-Bdvp4Uo-hwnR9V9Ax-UuqVOmHtpUjp3w-bzmXL7lH2ChaBjxC.jpg?size=200x0&quality=96&crop=0,0,960,960&ava=1'
                                    alt = 'object pic'
                                />
                                <Col>
                                    <h4>Object name</h4>
                                    <p className = 'objInnerText'>Дата аренды: 10-01-2020 по 15-01-2020</p>
                                    <p className = 'objInnerText'>Оценка арендодателя: 8 из 10</p>
                                    <p className = 'objInnerText'>Ваша оценка: 7 из 10</p>
                                </Col>

                                <button className = 'threeDotButton'>
                                    <Icon icon = {threeDotsVertical} />
                                </button>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item style = {{marginLeft: '-0.8em'}}>
                            <Row>
                                <img
                                    className = 'objPic'
                                    src = 'http://sun9-22.userapi.com/s/v1/if1/H7Xnl4D-VUT3dx1UqHOkz6-Bdvp4Uo-hwnR9V9Ax-UuqVOmHtpUjp3w-bzmXL7lH2ChaBjxC.jpg?size=200x0&quality=96&crop=0,0,960,960&ava=1'
                                    alt = 'object pic'
                                />
                                <Col>
                                    <h4>Object name</h4>
                                    <p className = 'objInnerText'>Дата аренды: 10-01-2020 по 15-01-2020</p>
                                    <p className = 'objInnerText'>Оценка арендодателя: 8 из 10</p>
                                    <p className = 'objInnerText'>Ваша оценка: </p>
                                </Col>

                                <button className = 'threeDotButton'>
                                    <Icon icon = {threeDotsVertical} />
                                </button>
                            </Row>
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
                        Отзывы о вас:
                    </h2>

                    <ListGroup style = {{width: '100%', marginBottom: '20px'}}>
                        <ListGroup.Item style = {{marginLeft: '-0.8em'}}>Здесь пока что пусто</ListGroup.Item>
                    </ListGroup>
                </Container>
            </div>
        );
    }
}

