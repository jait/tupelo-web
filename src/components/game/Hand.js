import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Card} from './Card'

export class Hand extends React.Component {
    render() {
        return (<Container><p>käsi</p>
            {this.props.hand.map((card) => <Card {...card}/>)}
            </Container>
            );
    }
}