import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {GameStatus} from './GameStatus'
import {Hand} from './Hand'
import {Card} from './Card'

export class GameArea extends React.Component {

    getPlayedCard(playerNo) {
        // eslint-disable-next-line eqeqeq
        const card = this.props.gameState.table.filter((card) => card.played_by == playerNo)
        return card.length ? <Card {...card[0]} /> : null;
    }

    render() {
        return (<Container>
            <GameStatus {...this.props} />
            <Row className="mt-4">
                <Col/>
                <Col>{this.getPlayedCard(2)}</Col>
                <Col/>
            </Row>
            <Row>
                <Col>{this.getPlayedCard(1)}</Col>
                <Col/>
                <Col>{this.getPlayedCard(3)}</Col>
            </Row>
            <Row>
                <Col/>
                <Col>{this.props.player.name}: {this.getPlayedCard(0)}</Col>
                <Col/>
            </Row>
            <Row>
                <Col xs={true}>
                    <Hand {...this.props}></Hand>
                </Col>
            </Row>
            </Container>);
    }
}