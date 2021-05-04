import { Col, Button, Form, FormControl } from 'react-bootstrap';
import React from 'react';

import './Experience.css';


export default function Experience() {
    const fullName = `${localStorage.getItem('firstName')}`;

    return (
        <div>
            <h2 className = "User">{fullName}, что ты хочешь найти?</h2>

            <Form inline className = "User">
                <Col sm={10} style={{padding: 0}}>
                    <FormControl type="text" placeholder="Введи чтобы найти...." className="mr-sm-2" style={{width: '90%'}}/>
                </Col>
                <Col sm={2} style={{padding: 0}}>
                    <Button variant="outline-primary">Поиск</Button>
                </Col>
            </Form>
        </div>
    );
}
