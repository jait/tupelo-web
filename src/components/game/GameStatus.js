import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Const from '../../constants'


function LeaveDialog(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Leave game?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Leaving game will end it for all players.
            Are you sure you want to leave?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Don't leave</Button>
          <Button variant="danger" onClick={props.onConfirm}>Yes, leave and end the game</Button>
        </Modal.Footer>
      </Modal>
    );
};

export class GameStatus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          showLeaveDialog: false
        };
    }

    render() {
        const {
            gameState,
            onLeaveGame,
        } = this.props;
        function item(text) {
            //return <Col><Button disabled variant="info">{text}</Button></Col>;
            return <Col><h4><Badge variant="info">{text}</Badge></h4></Col>;
        }
        var scoreStatus;
        if (gameState.score) {
            if (gameState.score[0] > 0) {
                scoreStatus = `Team 1: ${gameState.score[0]}`;
            }
            else if (gameState.score[1] > 0) {
                scoreStatus = `Team 2: ${gameState.score[1]}`;
            }
            else {
                scoreStatus = "Score: 0";
            }
        }
        return (<Container>
            <Row className="align-items-end">
            { item(gameState.status === Const.VOTING ? "VOTING" :
                (gameState.mode === Const.RAMI ? "RAMI" : "NOLO")) }
            { item(`Tricks: ${gameState.tricks[0]} - ${gameState.tricks[1]}`) }
            { item(scoreStatus) }
            <Col><Button variant="danger" onClick={() => this.setState({showLeaveDialog: true})}>Leave</Button></Col>
            </Row>
            <LeaveDialog show={this.state.showLeaveDialog} onHide={() => this.setState({showLeaveDialog: false})} onConfirm={onLeaveGame} />
            </Container>
            );
    }
}