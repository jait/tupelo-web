import React from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export class GameList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          games: [
              {id: "foo", players: [{name: "esko"}, {name: "seppo"}, {name: "pauli"}]},
              {id: "2", players: [{name: "matti"}, {name: "pekka"}], joined: false}
          ]
        };
    }

    createClicked() {
        // TODO: call API. test implementation
        var games = this.state.games;
        games.push({id: "new", players: [this.props.player], joined: true});
        this.setState({games: games});
    }

    leaveClicked(gameId, e) {
        // TODO: call API. test implementation
        console.log(`leaving joined game ${gameId}`);
        const updated = this.state.games.map((game) => {
            if (game.id === gameId) {
                game.joined = false;
                game.players = game.players.filter((p) => p.name !== this.props.player.name);
            }
            return game;
        });
        this.setState({games: updated.filter((game) => game.players.length > 0)});
    }

    gameClicked(gameId, e) {
        // TODO: call API. test implementation
        const updated = this.state.games.map((game) => {
            if (game.id === gameId) {
                game.joined = true;
                game.players.push(this.props.player);
            }
            return game;
        });
        console.log(updated);
        this.setState({games: updated});
    }

    render() {
        const {
            onStartGame
        } = this.props
        const { games } = this.state;

        var joined = games.filter((game) => game.joined === true);
        joined = joined.length > 0 ? joined[0] : null;

        const listItems = games.map((game) =>
            <ListGroup.Item
                className="justify-content-start"
                action={!joined}
                onClick={joined ? null: (e) => this.gameClicked(game.id, e)}
                key={game.id}
                active={game.joined === true}>{game.players.map((player) => { return player.name; }).join(", ")}</ListGroup.Item>
            );

        return (
            <Container>
                <Row><Col><h4>Games</h4></Col></Row>
                <Row>
                    <Col>
                        <ListGroup>
                            {listItems}
                        </ListGroup>
                    </Col>
                </Row>
                <div className="pt-2">
                    {joined ?
                        <Row>
                            <Col>
                                <Button className="m-1" disabled={joined.players.length < 4} variant="success" onClick={() => onStartGame(joined.id, {withBots: false})}>Start</Button>
                                <Button className="m-1" disabled={joined.players.length === 4} variant="success" onClick={() => onStartGame(joined.id, {withBots: true})}>Start&nbsp;with&nbsp;bots</Button>
                                <Button className="m-1" variant="danger" onClick={(e) => this.leaveClicked(joined.id, e)}>Leave</Button>
                            </Col>
                        </Row>
                    :   <Row>
                            <Col>
                                <Button className="m-1" variant="primary" onClick={() => this.createClicked()}>Create a game</Button>
                            </Col>
                        </Row>
                    }
                </div>
            </Container>
        );
    }
}
