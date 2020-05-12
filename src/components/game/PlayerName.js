import React from "react";
import Badge from 'react-bootstrap/Badge'

export class PlayerName extends React.Component {

    render() {
        const {player} = this.props;
        return (<Badge pill variant={player.team === 0 ? "secondary" : "dark"}>{player.player_name}</Badge>);
    }
}