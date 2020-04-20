import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {GameArea} from './GameArea'
import {EventLog} from './EventLog'

export class GameView extends React.Component {
    render() {
        return (
            <Container>
            <Row>
            <Col>
                <GameArea {...this.props}/>
            </Col>
            <Col xs={1}>
            </Col>
            <Col>
                <EventLog {...this.props}/>
            </Col>
            </Row>
            </Container>
        );
    }
}
