import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {GameStatus} from './GameStatus'
import {Hand} from './Hand'
import {Card} from './Card'
import {PlayerName} from './PlayerName'


const rowStyle = {
    "min-height": "8rem"
};

export class GameArea extends React.Component {

    getPlayedCard(playerNo) {
        // eslint-disable-next-line eqeqeq
        const card = this.props.gameState.table.filter((card) => card.played_by == playerNo)
        return card.length ? <Card {...card[0]} hover={false}/> : null;
    }

    render() {
        const {player} = this.props;
        const players = [
            player,
            {player_name: "Seppo", team: 1},
            {player_name: "Matti", team: 0},
            {player_name: "Keijo", team: 1}
        ];
        return (<Container className="px-0">
            <GameStatus {...this.props} />
            <Row xs={3} className="mt-4">

            <Col className="c1 align-self-center pr-0">
            <Row xs={1} md={2} className="align-items-center justify-content-end">
                <Col className="my-1 flex-shrink-1 d-flex justify-content-center" xs="auto"><PlayerName player={players[1]}/></Col>
                <Col className="pl-0" xs="auto">{this.getPlayedCard(1)}</Col></Row>
            </Col>

            <Col className="c2 justify-content-space-between px-0 flex-shrink-1">
            <Row><Col>
                <Row><Col className="d-flex justify-content-center"><PlayerName player={players[2]}/></Col></Row>
                <Row><Col className="d-flex justify-content-center my-2">{this.getPlayedCard(2)}</Col></Row>
            </Col></Row>

            <Row className="mt-4"><Col>
                <Row style={rowStyle}><Col className="d-flex justify-content-center">{this.getPlayedCard(0)}</Col></Row>
                <Row><Col className="d-flex justify-content-center my-2"><PlayerName player={player}/></Col></Row>
            </Col></Row>
            </Col>

            <Col className="c3 align-self-center pl-0">
            <Row xs={1} md={2} className="align-items-center justify-content-end flex-row-reverse">
                <Col className="my-1 flex-shrink-1 d-flex justify-content-center" xs="auto"><PlayerName player={players[3]}/></Col>
                <Col className="pr-0" xs="auto">{this.getPlayedCard(1)}</Col>
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