import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Const from '../../constants'



const infoBtnStyle = {
    cursor: "default"
};

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
            return <div className="mx-1 text-nowrap"><Button style={infoBtnStyle} disabled variant="info">{text}</Button></div>;
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
        return (<Container className="px-0">
            <div className="d-flex justify-content-start align-items-end">
            { item(gameState.status === Const.VOTING ? "VOTING" :
                (gameState.mode === Const.RAMI ? "RAMI" : "NOLO")) }
            { item(`Tricks: ${gameState.tricks[0]} - ${gameState.tricks[1]}`) }
            { item(scoreStatus) }
            <div className="mx-2"><Button variant="danger" onClick={() => this.setState({showLeaveDialog: true})}>Leave</Button></div>
            </div>
            <LeaveDialog show={this.state.showLeaveDialog} onHide={() => this.setState({showLeaveDialog: false})} onConfirm={onLeaveGame} />
            </Container>
            );
    }
}