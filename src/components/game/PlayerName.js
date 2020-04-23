import React from "react";
import Badge from 'react-bootstrap/Badge'

export class PlayerName extends React.Component {

    render() {
        const {name, teamId} = this.props;
        return (<Badge pill variant={teamId === 0 ? "secondary" : "dark"}>{name}</Badge>);
    }
}