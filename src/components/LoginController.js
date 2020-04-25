
import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { AppHeader } from './AppHeader';
import { Lobby } from './Lobby';
import { GameView } from './game/GameView';
import * as Api from '../Api'
import * as MockApi from '../__mock__/Api'


const USE_MOCK_API = true;

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
    }


    componentDidMount() {
        this.api.sendHello((data) => {
            console.log('hello:', data);
        },
        (error) => {
            console.error('nooh!', error);
        });
    }

    onLogin(player) {
        this.api.register(player, (data) => {
            console.log(data);
            this.api.setAuthKey(data.akey);
            this.setState({loggedIn: true, player: data});
        },
        (error) => {
            this.setState({showFailureDialog: true});
            console.error(error);
        });
    }

    onLogout() {
        this.setState({loggedIn: false, player: null});
    }

    onStartGame(gameId, params) {
        console.log(`starting game ${gameId}, with params: ${params}`);
        this.setState({inGame: true, gameId: gameId});
    }

    onLeaveGame() {
        console.log("left game");
        this.setState({inGame: false, gameId: null});
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
                this.state.inGame ? <GameView player={this.state.player} gameId={this.state.gameId} onLeaveGame={() => this.onLeaveGame()} />
                : <Lobby player={this.state.player} api={this.api} onStartGame={(gameId, params) => this.onStartGame(gameId, params)}/>
                )
            }
            <LoginFailDialog show={this.state.showFailureDialog} onClose={() => this.setState({showFailureDialog: false})} />
            </>
        );
    }
}
