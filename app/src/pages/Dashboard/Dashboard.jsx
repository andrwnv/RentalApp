import React, {useState, useEffect, useMemo} from 'react';
import socketio from 'socket.io-client';

import Experience from '../../components/Experience/Experience';
import {Container, Modal, Button} from 'react-bootstrap';
import Slider from 'react-slick';

import Header from '../../components/Header/Header';
import api from '../../services/api';

import './Dashboard.css';


export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [citySpots, setcitySpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(
        () =>
            socketio('http://localhost:3333', {
                query: {user_id}
            }),
        [user_id]
    );

    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        });
    }, [requests, socket]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/list', {
                headers: {user_id}
            });
            setSpots(response.data);
        }

        loadSpots();
    }, []);

    useEffect(() => {
        async function loadCitySpots() {
            const response = await api.get(`/spots`, {
                params: {
                    city: 'São Paulo'
                }
            });
            setcitySpots(response.data);
        }

        loadCitySpots();
    }, []);

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);
        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);
        setRequests(requests.filter(request => request._id !== id));
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 765,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className = "containerDashboard">

            <Header />

            <ul className = "notifications">
                {requests.map(request => (
                    <Modal.Dialog>
                        <li key = {request._id}>
                            <Modal.Header>
                                <Modal.Title>
                                    У вас есть новый запрос!
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <strong>{request.user.email}</strong> запрашивает
                                                                      резервирование
                                                                      в <strong>{request.spot.title}</strong> к
                                                                      data:{' '}
                                <strong>{request.date}</strong>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    className = "accept"
                                    onClick = {() => handleAccept(request._id)}
                                >
                                    Принять
                                </Button>
                                <Button
                                    className = "reject"
                                    onClick = {() => handleReject(request._id)}
                                >
                                    Отклонить
                                </Button>
                            </Modal.Footer>
                        </li>
                    </Modal.Dialog>
                ))}
            </ul>

            <Experience />

            <div className = "contentDashboard">
                <Container>
                    <h2 className = "ferias">Где провести отпуск?</h2>
                    <div className = "spot-list">
                        <Slider {...settings}>
                            {spots.map(spot => (
                                <div>
                                    <div className = "contentSpots">
                                        <div className = "Image">
                                            <header
                                                style = {{
                                                    backgroundImage: `url(${spot.thumbnail_url})`
                                                }}
                                            />
                                        </div>

                                        <div className = "spots">
                                            <strong>{spot.title}</strong>
                                            <p>{spot.city}</p>
                                            <span>
                        {spot.price ? `R$${spot.price}/dia` : 'СВОБОДНЫЙ'}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </Container>
            </div>

            <Container>
                <h2 className = "ferias">Рекомендуется для вас</h2>
                <div className = "spot-list">
                    <Slider {...settings}>
                        {citySpots.map(spot => (
                            <div>
                                <div className = "contentSpots">
                                    <div className = "Image">
                                        <header
                                            style = {{
                                                backgroundImage: `url(${spot.thumbnail_url})`
                                            }}
                                        />
                                    </div>

                                    <div className = "spots">
                                        <strong>{spot.title}</strong>
                                        <p>{spot.city}</p>
                                        <span>
                      {spot.price ? `R$${spot.price}/dia` : 'СВОБОДНЫЙ'}
                    </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </Container>
        </div>
    );
};
