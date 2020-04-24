import React from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export class PlayerList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            players: []
        };
    }

    componentDidMount() {
        this.fetchPlayerList();
    }

    fetchPlayerList() {
        const {api} = this.props;
        api.listPlayers((result) => {
            console.log("players", result);
            this.setState({players: result});
        },
        (error) => {
            console.error(error);
        });
    }

    render() {

        const listItems = this.state.players.map((player) =>
            <ListGroup.Item key={player.id}>{player.player_name}</ListGroup.Item>
            );

        return (
            <Container>
                <Row><Col><h4>Players</h4></Col></Row>
                <Row>
                    <Col>
                        <ListGroup>
                            {listItems}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}
