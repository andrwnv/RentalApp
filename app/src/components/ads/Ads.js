import React from 'react';
import { Card, ListGroupItem, ListGroup } from 'react-bootstrap';

export default function Ads({name, desc, picLinks}) {
    console.log(picLinks);

    return (
        <Card style = {{width: '100%', margin: '10px'}}>
            <Card.Img variant = "top" src = {picLinks} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{desc}</Card.Text>
            </Card.Body>
            <ListGroup className = "list-group-flush">
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Card.Link href = "#">Card Link</Card.Link>
                <Card.Link href = "#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}
