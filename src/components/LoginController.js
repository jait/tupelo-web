
import React from 'react';
import { AppHeader } from './AppHeader';
import { Lobby } from './Lobby';
import { GameView } from './game/GameView';

export class LoginController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            player: null,
            inGame: false
        };
    }

    onLogin(player) {
        // TODO: call API
        this.setState({loggedIn: true, player: player, inGame: false});
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
                : <Lobby player={this.state.player} onStartGame={(gameId, params) => this.onStartGame(gameId, params)}/>
                )
            }
            </>
        );
    }
}
