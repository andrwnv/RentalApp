import React, { useState } from 'react';

import Experience from '../../components/Experience/Experience';
import { Container, Button, Row } from 'react-bootstrap';

import Header from '../../components/Header/Header';
import api from '../../services/api';

import './Dashboard.css';
import { Ads } from '../../components/ads/Ads';

import Cookies from '../../services/cookies';

export default function Dashboard() {
    const [data, setData] = useState();
    const [isEndData, setIsEndData] = useState(false);
    const [buttonText, setButtonText] = useState('Загрузить еще...');

    localStorage.setItem('countForLoad', '' + 4);
    localStorage.setItem('currentPaddingForLoad', '' + 0);

    const getAdsData = (count, padding) => {
        api.get(`http://localhost:3080/rent_ads/all?count=${count}&padding=${padding}`, {
            headers: {
                'token': Cookies.get('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const loadedData = res.data.data;

            if (loadedData.length === 0) {
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

            jsxData[curIndex].push(<Ads name = {obj.title + obj.id} desc = {obj.description}
                                        picLinks = {obj.mediaLinks.urls[0]} />);
        });
    }

    const resJSX = [];
    jsxData.forEach(arr => {
        resJSX.push(
            <Row className = "row justify-content-center" style = {{
                flexWrap: 'nowrap',
            }}>
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
        <div className = "containerDashboard">
            <Header />

            <Experience />
            <h2 className = "headText">Рекомендуется для вас</h2>
            <div className = "dataContainer">
                {resJSX}
            </div>

            <Container style = {{width: '15%', marginBottom: '20px', marginTop: '10px'}}>
                <Button variant = "outline-primary"
                        onClick = {loadMoreEvent}
                        disabled={isEndData}
                >
                    {buttonText}
                </Button>
            </Container>
        </div>
    );
};
