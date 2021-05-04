import React from 'react';

import Adventure from '../../assets/adventure.jpg';
import Kitchen from '../../assets/kitchen.jpeg';
import Bedroom from '../../assets/bedroom.png';
import Food from '../../assets/food.jpeg';

import './Experience.css';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import {Col} from 'react-bootstrap';

export default function Experience() {
    const fullName = `${localStorage.getItem('lastName')} ${localStorage.getItem('firstName')}`;

    return (
        <div>
            <h2 className = "User">{fullName}, что ты хочешь найти?</h2>
            <div className = "cardStyle">
                <div className = "Experience">
                    <img src = {Bedroom} alt = "" className = "img" />
                    <p>Дом</p>
                </div>

                <div className = "Experience">
                    <img src = {Kitchen} alt = "" className = "img" />
                    <p>Квартира</p>
                </div>

                <div className = "Experience">
                    <img src = {Adventure} alt = "" className = "img" />
                    <p>Комната</p>
                </div>

                <div className = "Experience">
                    <img src = {Food} alt = "" className = "img" />
                    <p>Отель</p>
                </div>

                <div className = "Experience">
                    <img src = {Food} alt = "" className = "img" />
                    <p>Хостл</p>
                </div>
            </div>
        </div>
    );
}
