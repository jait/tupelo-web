import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { GameList } from './GameList';
import { PlayerList } from './PlayerList';

export class Lobby extends React.Component {
    render() {
        const games =[
            {id: "foo", players: [{name: "esko"}, {name: "seppo"}]},
            {id: "2", players: [{name: "matti"}, {name: "pekka"}], joined: false},
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
                <PlayerList players={[{name: "Esko"},{name: "Matti"}, this.props.player]}/>
            </Col>
            </Row>
            </Container>
        );
    }
}
