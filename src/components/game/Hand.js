import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Card} from './Card'

export class Hand extends React.Component {

    render() {
        const {hand, onSelectCard} = this.props;
        return (<Container>
            {hand.map((card) => <Card className="ml-n3" onClick={(card) => onSelectCard(card)} {...card}/>)}
            </Container>
            );
    }
}