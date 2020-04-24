import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { GameList } from './GameList';
import { PlayerList } from './PlayerList';

export class Lobby extends React.Component {
    render() {
        const games =[
            {id: "foo", players: [{player_name: "esko"}, {player_name: "seppo"}]},
            {id: "2", players: [{player_name: "matti"}, {player_name: "pekka"}], joined: false},
        ]
        return (
            <Container>
            <Row>
            <Col>
                <GameList {...this.props} games={games}/>
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
