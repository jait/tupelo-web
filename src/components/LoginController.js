
import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { AppHeader } from './AppHeader';
import { Lobby } from './Lobby';
import { GameView } from './game/GameView';
import * as Api from '../Api'
import * as MockApi from '../__mock__/Api'
import dispatcher from '../GameEvents'


const USE_MOCK_API = false;

function LoginFailDialog(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Login failed
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
              There was a problem and login failed.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>Okay</Button>
        </Modal.Footer>
      </Modal>
    );
};

export class LoginController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            player: null,
            inGame: false,
        };
        this.api = USE_MOCK_API ? MockApi: Api;
        this.fetchEventsTimer = null;
    }


    componentDidMount() {
        this.api.sendHello((data) => {
            console.log('hello:', data);
        },
        (error) => {
            console.error('nooh!', error);
        });
    }

    componentWillUnmount() {
        if (this.fetchEventsTimer) {
            clearInterval(this.fetchEventsTimer);
        }
    }

    onLogin(player) {
        this.api.register(player, (data) => {
            console.log(data);
            this.api.setAuthKey(data.akey);
            this.setState({loggedIn: true, player: data});
            this.fetchEventsTimer = setInterval(() => this.fetchEvents(), 5000);
        },
        (error) => {
            this.setState({showFailureDialog: true});
            console.error(error);
        });
    }

    onLogout() {
        this.api.quit(() => {
            this.setState({loggedIn: false, player: null});
            clearInterval(this.fetchEventsTimer);
        },
        (error) => {
            this.setState({showFailureDialog: true});
            console.error(error);
        });
    }

    fetchEvents() {
        this.api.getEvents(
            (result) => {
                if (result) {
                    result.forEach((event) => {
                        dispatcher.dispatchEvent(event);
                    });
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }

    onStartGame(gameId, params) {
        console.log(`starting game ${gameId}, with params: ${params}`);
        this.api.startGame(gameId, params,
            (result) => {
                this.onGameStarted(gameId);
            },
            (error) => {
                console.error(error);
                this.setState({ showFailureDialog: true });
            }
        );
    }

    onGameStarted(gameId) {
        this.setState({ inGame: true, gameId: gameId });
        this.fetchEvents();
    }

    onLeaveGame() {
        console.log("left game");
        this.api.leaveGame(this.state.gameId,
            (result) => {
                this.setState({inGame: false, gameId: null});
            },
            (error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <>
            <AppHeader
                player={this.state.player}
                onLogin={(player) => this.onLogin(player)}
                onLogout={() => this.onLogout()}
            />
            {this.state.loggedIn && (
                this.state.inGame ? <GameView player={this.state.player} api={this.api} gameId={this.state.gameId} onLeaveGame={() => this.onLeaveGame()} />
                : <Lobby
                    player={this.state.player} api={this.api}
                    onStartGame={(gameId, params) => this.onStartGame(gameId, params)}
                    onGameStarted={(gameId) => this.onGameStarted(gameId)}/>
                )
            }
            <LoginFailDialog show={this.state.showFailureDialog} onClose={() => this.setState({showFailureDialog: false})} />
            </>
        );
    }
}
