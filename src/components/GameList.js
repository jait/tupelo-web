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
            games: []
        };
        this.fetchTimer = null;
    }

    componentDidMount() {
        this.fetchGameList();
        this.fetchTimer = setInterval(() => this.fetchGameList(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.fetchTimer);
    }

    fetchGameList() {
        const { api } = this.props;
        api.listGames((result) => {
            console.log("games", result);
            this.setState({ games: result || [] });
        },
            (error) => {
                console.error(error);
            });
    }

    createClicked() {
        const { api } = this.props;
        api.createGame((result) => {
            console.log("game created", result);
            //var games = this.state.games;
            //games.push({id: result, players: [this.props.player], joined: true});
            //this.setState({games: games});
            this.fetchGameList();
        },
            (error) => {
                console.error(error);
            });
    }

    leaveClicked(gameId, e) {
        const { api } = this.props;
        console.log(`leaving joined game ${gameId}`);
        // TODO: update UI already now?
        api.leaveGame(gameId,
            (result) => {
                this.fetchGameList();
            },
            (error) => {
                console.error(error);
            });
        /*
        const updated = this.state.games.map((game) => {
            if (game.id === gameId) {
                game.joined = false;
                game.players = game.players.filter((p) => p.name !== this.props.player.name);
            }
            return game;
        });
        this.setState({games: updated.filter((game) => game.players.length > 0)});
        */
    }

    gameClicked(gameId, e) {
        const { api } = this.props;
        // TODO: update UI to "joining" state?
        api.joinGame(gameId,
            (result) => {
                const updated = this.state.games.map((game) => {
                    if (game.id === gameId) {
                        game.joined = true;
                        game.players.push(this.props.player);
                    }
                    return game;
                });
                this.setState({ games: updated });
                this.fetchGameList();
            },
            (error) => {
                console.error(error);
            });
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
                action={!(joined || game.players.length === 4)}
                onClick={joined || game.players.length === 4 ? null : (e) => this.gameClicked(game.id, e)}
                key={game.id}
                active={game.joined === true}>{game.players.map((player) => { return player.player_name; }).join(", ")}</ListGroup.Item>
        );

        return (
            <Container className="mt-3">
                <Row><Col><h4>Games</h4></Col></Row>
                <Row>
                    <Col>
                        <ListGroup className="shadow-sm">
                            {listItems}
                        </ListGroup>
                    </Col>
                </Row>
                <div className="pt-2 text-nowrap">
                    {joined ?
                        <Row>
                            <Col>
                                <Button className="m-1" disabled={joined.players.length < 4} variant="success" onClick={() => onStartGame(joined.id, { withBots: false })}>Start</Button>
                                <Button className="m-1" disabled={joined.players.length === 4} variant="success" onClick={() => onStartGame(joined.id, { withBots: true })}>Start&nbsp;with&nbsp;bots</Button>
                                <Button className="m-1" variant="danger" onClick={(e) => this.leaveClicked(joined.id, e)}>Leave</Button>
                            </Col>
                        </Row>
                        : <Row>
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
