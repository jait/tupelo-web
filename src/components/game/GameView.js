import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {GameArea} from './GameArea'
import {EventLog} from './EventLog'
import dispatcher, { CARD_PLAYED, MESSAGE, TRICK_PLAYED, TURN, STATE_CHANGED } from '../../GameEvents'


const EVENT_DELAY = 500; // ms

export class GameView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameState: {},
            gameInfo: {},
            hand: [],
            eventLogContent: ""
        };
        this.fetchStateTimer = null;
        this.fetchEventsTimer = null;
        this.onEvent = this.onEvent.bind(this);
        this.eventQueue = [];
        this.processingEvents = false;
        this.processEventsTimer = null;
        this.parsers = {
            [MESSAGE]: (event) => {
                return `${event.sender}: ${event.message}`;
            },
            [TURN]: (event) => {
                return "It's your turn now.";
            }
        }
        this.myPlayedCard = null;
    }

    componentDidMount() {
        dispatcher.addListeners([CARD_PLAYED, MESSAGE, TRICK_PLAYED, TURN, STATE_CHANGED], this.onEvent);
        this.fetchGameInfo();
        this.fetchGameState();
        //this.fetchStateTimer = setInterval(() => this.fetchGameState(), 3000);
    }
    componentWillUnmount() {
        //clearInterval(this.fetchTimer);
        if (this.processEventsTimer) {
            clearInterval(this.processEventsTimer);
        }
    }

    fetchGameState(updateHandOnly=false) {
        const { api, gameId } = this.props;
        api.getGameState(gameId,
            (result) => {
                console.log("state", result);
                let stateUpdate = { hand: result.hand };
                if (!updateHandOnly) {
                    stateUpdate.gameState = result.game_state;
                }
                this.setState(stateUpdate);
            },
            (error) => {
                console.error(error);
            });
    }

    setGameState(state) {
        this.setState({ gameState: state, myPlayedCard: null });
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

    onEvent(event) {
        //console.log(event);
        this.eventQueue.push(event);
        this.startEventProcessing();
    }

    startEventProcessing() {
        if (this.processingEvents) {
            return;
        }
        this.processingEvents = true;
        this.processEventsTimer = setInterval(() => this.processNextEvent(), EVENT_DELAY);
    }

    processNextEvent() {
        // process one event from the queue
        const event = this.eventQueue.shift();
        console.log("processing", event);
        this.handleEvent(event);
        if (this.eventQueue.length === 0) {
            clearInterval(this.processEventsTimer);
            this.processEventsTimer = null;
            this.processingEvents = false;
        }
    }

    getEventText(event) {
        const parser = this.parsers[event.type];
        if (parser) {
            return parser(event);
        }
        return null;
    }

    handleEvent(event) {
        switch (event.type) {
            case STATE_CHANGED:
                console.log("state", event.game_state);
                this.setGameState(event.game_state);
                break;
            case TURN:
                this.setGameState(event.game_state);
                break;
            case CARD_PLAYED:
                this.setGameState(event.game_state);
                break;
            case TRICK_PLAYED:
                this.setGameState(event.game_state);
                break;
            default:
                break;
        }
        // append to log
        const text = this.getEventText(event);
        if (text !== null) {
            this.setState({eventLogContent: this.state.eventLogContent + text + "\n"});
        }
    }

    onCardInHandSelected(card) {
        const { api, gameId } = this.props;
        console.log(`card clicked: ${card.value}${card.suit}`);
        api.playCard(gameId, card,
            (result) => {
                console.log(result);
                this.fetchGameState(true);
                // TODO: trigger fetching of events
                if (result !== true) {
                    // {code: 2, message: "Suit must be followed"}
                }
                else {
                    this.setState({myPlayedCard: card});
                }
            },
            (error) => {
                console.error(error);
            });

        // remove
        // eslint-disable-next-line eqeqeq
        //this.setState({hand: this.state.hand.filter((c) => card.suit != c.suit || card.value != c.value)});
        //this.state.gameState.table.push({...card, played_by: 0})
    }

    render() {
        return (
            <Container fluid="sm" className="mt-3 px-1 px-sm-3">
            <Row xs={1} lg={2}>
            <Col xs="auto" className="flex-grow-1">
                <GameArea {...this.props} gameState={this.state.gameState} myPlayedCard={this.state.myPlayedCard} gameInfo={this.state.gameInfo} hand={this.state.hand} onSelectCard={(card) => this.onCardInHandSelected(card)}/>
            </Col>
            <Col xs="auto">
                <EventLog {...this.props} content={this.state.eventLogContent} />
            </Col>
            </Row>
            </Container>
        );
    }
}