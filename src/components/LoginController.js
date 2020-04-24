
import React from 'react';
import { AppHeader } from './AppHeader';
import { Lobby } from './Lobby';
import { GameView } from './game/GameView';
import * as Api from '../Api'

export class LoginController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            player: null,
            inGame: false,
        };
        this.api = Api;
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
        // TODO: call API
        this.api.register(player, (data) => {
            console.log(data);
            this.api.setAuthKey(data.akey);
            this.setState({loggedIn: true, player: data});
        },
        (error) => {
            console.error(error);
        });
        //this.setState({loggedIn: true, player: player, inGame: false});
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
            </>
        );
    }
}
