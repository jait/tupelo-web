import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Card} from './Card'


const handStyle = {
    "margin-left": "auto",
    "margin-right": "auto",
    "justify-content": "center",
    display: "grid",
    "grid-template-columns": "repeat(auto-fit,  minmax(10px, max-content))"
};

const cardStyle = {
    ":hover": {
        cursor: "pointer"
    }
}

export class Hand extends React.Component {

    toggleCardHover(card) {

    }
    render() {
        const {hand, onSelectCard} = this.props;
        return (<div style={handStyle}>
            {hand.map((card) => <Card hover={true} className="ml-n3" onClick={(card) => onSelectCard(card)} {...card}/>)}
            </div>
            );
    }
}