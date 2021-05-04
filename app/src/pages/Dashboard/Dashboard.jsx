import React, { useState } from 'react';

import Experience from '../../components/Experience/Experience';
import { Modal, Button, Row } from 'react-bootstrap';

import Header from '../../components/Header/Header';
import api from '../../services/api';

import './Dashboard.css';
import Ads from '../../components/ads/Ads';

import Cookies from '../../services/cookies';

export default function Dashboard() {
    const [data, setData] = useState();

    const getAdsData = (count, padding) => {
        api.get(`http://localhost:3080/rent_ads/all?count=${count}&padding=${padding}`, {
            headers: {
                'token': Cookies.get('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setData(res.data.data);
        });

        // console.log(res);
    };

    const jsxData = [[], []];

    if( data === undefined ) {
        console.log('im here');
        getAdsData(8, 0);
    } else {
        let counter = 0;
        data.forEach(obj => {
            console.log(obj);
            if( counter < 4 ) {
                jsxData[0].push(<Ads name = {obj.title} desc = {obj.description} picLinks = {obj.mediaLinks.urls[0]} />);
            } else {
                jsxData[1].push(<Ads name = {obj.title} desc = {obj.description} picLinks = {obj.mediaLinks.urls[0]} />);
            }

            counter++;
        });
    }

    return (
        <div className = "containerDashboard">
            <Header />

            <Experience />
            <h2 className = "headText">Рекомендуется для вас</h2>
            <div className = "dataContainer">
                <Row className = "row justify-content-center" style = {{
                    flexWrap: 'nowrap',
                }}>
                    {jsxData[0]}
                </Row>

                <Row className = "row justify-content-center" style = {{
                    flexWrap: 'nowrap'
                }}>
                    {jsxData[1]}
                </Row>
            </div>
        </div>
    );
};
