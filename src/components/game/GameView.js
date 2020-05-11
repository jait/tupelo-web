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
            gameState: {},
            gameInfo: {},
            hand: []
        };
        this.fetchStateTimer = null;
        this.fetchEventsTimer = null;
    }

    componentDidMount() {
        this.fetchGameInfo();
        this.fetchGameState();
        //this.fetchStateTimer = setInterval(() => this.fetchGameState(), 3000);
    }
    componentWillUnmount() {
        //clearInterval(this.fetchTimer);
    }

    fetchGameState() {
        const { api, gameId } = this.props;
        api.getGameState(gameId,
            (result) => {
                console.log("state", result);
                this.setState({ gameState: result.game_state, hand: result.hand });
            },
            (error) => {
                console.error(error);
            });
    }

    fetchGameInfo() {
        const { api, gameId } = this.props;
        api.getGameInfo(gameId,
            (result) => {
                console.log("info", result);
                this.setState({ gameInfo: result });
            },
            (error) => {
                console.error(error);
            });
    }

    fetchEvents() {
        const { api, gameId } = this.props;
        api.getGameEvents(gameId,
            (result) => {
                console.log("events", result);
            },
            (error) => {
                console.error(error);
            });
    }

    onCardInHandSelected(card) {
        console.log(`card clicked: ${card.value}${card.suit}`);
        // TODO: call API to play card
        // remove
        // eslint-disable-next-line eqeqeq
        this.setState({hand: this.state.hand.filter((c) => card.suit != c.suit || card.value != c.value)});
        this.state.gameState.table.push({...card, played_by: 0})
    }

    render() {
        return (
            <Container fluid="sm" className="mt-3 px-1 px-sm-3">
            <Row xs={1} lg={2}>
            <Col xs="auto" className="flex-grow-1">
                <GameArea {...this.props} gameState={this.state.gameState} gameInfo={this.state.gameInfo} hand={this.state.hand} onSelectCard={(card) => this.onCardInHandSelected(card)}/>
            </Col>
            <Col xs="auto">
                <EventLog {...this.props}/>
            </Col>
            </Row>
            </Container>
        );
    }
}