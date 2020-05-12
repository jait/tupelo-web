import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { GameList } from './GameList';
import { PlayerList } from './PlayerList';

export class Lobby extends React.Component {
    render() {
        return (
            <Container>
            <Row>
            <Col>
                <GameList {...this.props} />
            </Col>
            <Col xs={1}>
            </Col>
            <Col>
                <PlayerList {...this.props} />
            </Col>
            </Row>
            </Container>
        );
    }
}
