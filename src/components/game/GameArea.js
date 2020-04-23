import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {GameStatus} from './GameStatus'
import {Hand} from './Hand'
import {Card} from './Card'
import {PlayerName} from './PlayerName'


const rowStyle = {
    "min-height": "8em"
};

export class GameArea extends React.Component {

    getPlayedCard(playerNo) {
        // eslint-disable-next-line eqeqeq
        const card = this.props.gameState.table.filter((card) => card.played_by == playerNo)
        return card.length ? <Card {...card[0]} /> : null;
    }

    render() {
        const {player} = this.props;
        return (<Container>
            <GameStatus {...this.props} />
            <Row className="mt-4"><Col className="d-flex justify-content-center"><PlayerName name="Seppo" teamId={0}/></Col></Row>
            <Row style={rowStyle} className="mt-1">
                <Col className="d-flex justify-content-center">{this.getPlayedCard(2)}</Col>
            </Row>
            <Row className="my-2" style={rowStyle}>
                <Col className="d-flex align-items-center"><PlayerName name="Matti" teamId={1}/></Col>
                <Col>{this.getPlayedCard(1)}</Col>
                <Col/>
                <Col>{this.getPlayedCard(3)}</Col>
                <Col className="d-flex align-items-center"><PlayerName name="Keijo" teamId={1}/></Col>
            </Row>
            <Row style={rowStyle}>
                <Col className="d-flex justify-content-center">{this.getPlayedCard(0)}</Col>
            </Row>
            <Row className="my-1"><Col className="d-flex justify-content-center"><PlayerName name={player.name} teamId={0}/></Col></Row>
            <Row>
                <Col xs={true}>
                    <Hand {...this.props}></Hand>
                </Col>
            </Row>
            </Container>);
    }
}