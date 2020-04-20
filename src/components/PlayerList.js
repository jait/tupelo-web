import React from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export class PlayerList extends React.Component {

    render() {

        const {
            players
        } = this.props;

        const listItems = players.map((player) =>
            <ListGroup.Item key={player.name}>{player.name}</ListGroup.Item>
            );

        return (
            <Container>
                <Row><Col><h4>Players</h4></Col></Row>
                <Row>
                    <Col>
                        <ListGroup>
                            {listItems}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}
