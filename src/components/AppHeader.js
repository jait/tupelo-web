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

    handleLogin(event) {
        const { onLogin } = this.props;
        if (this.state.playerName.length) {
            event.preventDefault();
            event.stopPropagation();
            console.log(`Entering lobby as ${this.state.playerName}`);
            onLogin({player_name: this.state.playerName});
        }
    };

    onLogout() {
        this.setState({playerName: ''});
        this.props.onLogout();
    }

    render() {
        const {player} = this.props;
        //            <Navbar.Brand>TUPPI</Navbar.Brand>
        return (
            <div className="mb-1">
                <Navbar className="pl-2" bg="dark" variant="dark">
                <Container>
                    <h1 class="text-white h2">{'\u{1f183}\u{1f184}\u{1f17f}\u{1f17f}\u{1f178}'}</h1>
                    <Nav className="mr-auto"/>
                { !player ?
                <Form inline onSubmit={(event) => this.handleLogin(event)}>
                    <FormControl type="text" placeholder="Name" className="mr-sm-2" onChange={evt => this.updatePlayerName(evt)} />
                    <Button type="submit" variant="primary" disabled={this.state.playerName.length === 0}>Enter</Button>
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
