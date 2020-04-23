import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {GameArea} from './GameArea'
import {EventLog} from './EventLog'

export class GameView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameState: null,
            hand: []
        };

        this.state.gameState = {
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

        this.state.hand = [
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
    }

    onCardInHandSelected(card) {
        console.log(`card clicked: ${card.value}${card.suit}`);
        // remove
        // eslint-disable-next-line eqeqeq
        this.setState({hand: this.state.hand.filter((c) => card.suit != c.suit || card.value != c.value)});
        this.state.gameState.table.push({...card, played_by: 0})
    }

    render() {
        return (
            <Container fluid="sm">
            <Row xs={1} lg={2}>
            <Col xs="auto" className="flex-grow-1">
                <GameArea {...this.props} gameState={this.state.gameState} hand={this.state.hand} onSelectCard={(card) => this.onCardInHandSelected(card)}/>
            </Col>
            <Col xs="auto">
                <EventLog {...this.props}/>
            </Col>
            </Row>
            </Container>
        );
    }
}
