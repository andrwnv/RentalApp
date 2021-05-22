import React from 'react';
import { Card } from 'react-bootstrap';

export function Ads({name, desc, picLinks, objectId}) {
    return (
        <Card style = {{width: '25%', margin: '10px'}}>
            <Card.Img
                variant = 'top' src = {picLinks} style = {{
                width: '100%'
            }}
            />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{desc}</Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Link
                    href = {`/ad/${objectId}`}
                >
                    Перейти
                </Card.Link>
            </Card.Body>
        </Card>
    );
}
