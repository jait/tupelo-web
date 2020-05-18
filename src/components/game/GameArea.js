import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {GameStatus} from './GameStatus'
import {Hand} from './Hand'
import {Card} from './Card'
import {PlayerName} from './PlayerName'

const rowStyle = {
    minHeight: "8rem"
};

export class GameArea extends React.Component {

    cardOnTable(card) {
        return <Card {...card} isOnTable={false} hover={false}/>;
    }

    getPlayedCard(seatNo) {
        const { gameState } = this.props;
        if (! gameState || !gameState.table) {
            return null;
        }

        const player = this.getPlayer(seatNo);
        // eslint-disable-next-line eqeqeq
        const card = gameState.table.find((card, index, array) => card.played_by == player.id)
        return card ? this.cardOnTable(card) : null;
    }

    getPlayer(seatNo) {
        const { gameInfo } = this.props;
        if (!gameInfo.players) {
            return {};
        }
        return gameInfo.players[(seatNo + this.myIndex) % gameInfo.players.length];
    }

    findMyIndex() {
        const { player, gameInfo } = this.props;
        if (!gameInfo.players) {
            return 0;
        }
        return gameInfo.players.findIndex((plr, index, array) => {
            return plr.id === player.id;
        });
    }

    render() {
        const { player, myPlayedCard } = this.props;
        this.myIndex = this.findMyIndex();
        return (<Container className="px-0">
            <GameStatus {...this.props} />
            <Row xs={3} className="mt-4">

            <Col className="c1 align-self-center pr-0">
            <Row xs={1} md={2} className="align-items-center justify-content-end">
                <Col className="my-1 flex-shrink-1 d-flex justify-content-center" xs="auto"><PlayerName player={this.getPlayer(1)}/></Col>
                <Col className="pl-0" xs="auto">{this.getPlayedCard(1)}</Col></Row>
            </Col>

            <Col className="c2 justify-content-space-between px-0 flex-shrink-1">
            <Row><Col>
                <Row><Col className="d-flex justify-content-center"><PlayerName player={this.getPlayer(2)}/></Col></Row>
                <Row style={rowStyle}><Col className="d-flex justify-content-center my-2">{this.getPlayedCard(2)}</Col></Row>
            </Col></Row>

            <Row className="mt-4"><Col>
                <Row style={rowStyle}><Col className="d-flex justify-content-center">{ myPlayedCard ? this.cardOnTable(myPlayedCard) : this.getPlayedCard(0)}</Col></Row>
                <Row><Col className="d-flex justify-content-center my-2"><PlayerName player={player}/></Col></Row>
            </Col></Row>
            </Col>

            <Col className="c3 align-self-center pl-0">
            <Row xs={1} md={2} className="align-items-center justify-content-end flex-row-reverse">
                <Col className="my-1 flex-shrink-1 d-flex justify-content-center" xs="auto"><PlayerName player={this.getPlayer(3)}/></Col>
                <Col className="pr-0" xs="auto">{this.getPlayedCard(3)}</Col>
                </Row>
            </Col>

            </Row>

            <Row className="mt-3">
                <Col xs={true}>
                    <Hand {...this.props} enableSelect={true}></Hand>
                </Col>

            </Row>
            </Container>);
    }
}