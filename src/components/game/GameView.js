import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {GameArea} from './GameArea'
import {EventLog} from './EventLog'

export class GameView extends React.Component {

    onCardInHandClick(card) {
        console.log(`card clicked: ${card}`);
    }

    render() {
        const gameState = {
            "status": 2,
            "mode": 1,
            "table": [
                {
                    "suit": 2,
                    "value": 2,
                    "played_by": "1"
                },
                {
                    "suit": 2,
                    "value": 4,
                    "played_by": "2"
                },
                {
                    "suit": 2,
                    "value": 3,
                    "played_by": "3"
                }
            ],
            "score": [
                8,
                0
            ],
            "tricks": [
                1,
                2
            ],
            "turn": 0,
            "turn_id": "BRhWZf9SQ_CLVF6Y3zZhxw"
        };
        const hand = [
            {
                "suit": 0,
                "value": 2
            },
            {
                "suit": 0,
                "value": 7
            },
            {
                "suit": 0,
                "value": 9
            },
            {
                "suit": 1,
                "value": 3
            },
            {
                "suit": 1,
                "value": 5
            },
            {
                "suit": 1,
                "value": 8
            },
            {
                "suit": 1,
                "value": 10
            },
            {
                "suit": 2,
                "value": 5
            },
            {
                "suit": 2,
                "value": 8
            },
            {
                "suit": 2,
                "value": 13
            },
            {
                "suit": 3,
                "value": 4
            },
            {
                "suit": 3,
                "value": 7
            },
            {
                "suit": 3,
                "value": 11
            }
        ];



        return (
            <Container>
            <Row>
            <Col xs="auto">
                <GameArea {...this.props} gameState={gameState} hand={hand} onSelectCard={(card) => this.onCardInHandClick(card)}/>
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
