import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export class GameArea extends React.Component {
    render() {
        return <p>Play fair, {this.props.player.name}</p>
    }
}