import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'


export class AppHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          playerName: ''
        };
    }

    updatePlayerName(evt) {
        this.setState({
          playerName: evt.target.value
        });
    }

    enterClicked() {
        const { onLogin } = this.props;
        console.log(`Entering lobby as ${this.state.playerName}`);
        onLogin({player_name: this.state.playerName});
    }

    onLogout() {
        this.setState({playerName: ''});
        this.props.onLogout();
    }

    render() {
        const {player} = this.props;
        return (
            <div className="mb-4">
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand>Tupelo</Navbar.Brand>
                    <Nav className="mr-auto"/>
                { !player ?
                <Form inline>
                    <FormControl type="text" placeholder="Name" className="mr-sm-2" onChange={evt => this.updatePlayerName(evt)} />
                    <Button variant="primary" disabled={this.state.playerName.length === 0} onClick={() => this.enterClicked()}>Enter</Button>
                </Form>
                : <><Navbar.Collapse className="justify-content-end mr-3"><Navbar.Text>{player.player_name}</Navbar.Text></Navbar.Collapse>
                <Form inline><Button variant="primary" onClick={() => this.onLogout()}>Sign&nbsp;out</Button></Form>
                </>
                }
                </Container>
                </Navbar>
            </div>
        );
    }
}
