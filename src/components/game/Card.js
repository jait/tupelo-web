import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const CardIcons = require.context('../../assets/cards', true, /[A-Z0-9.]/);

const suits = [
    {
        name: "spades",
        html: "&#x2660;"
    },
    {
        name: "diamonds",
        html: "&#x2666;"
    },
    {
        name: "clubs",
        html: "&#x2663;"
    },
    {
        name: "hearts",
        html: "&#x2665;"
    }
];

const cardStyle = {
    "max-width": "6em"
};

export class Card extends React.Component {

    valueToChar(value) {
        switch (value) {
            case 11:
              return "J";
            case 12:
              return "Q";
            case 13:
              return "K";
            case 1:
            case 14:
              return "A";
            default:
              return `${value}`;
          }
    }

    imgPath(path) {
        return CardIcons(path);
    }

    cardImgTag() {
        const {suit, value} = this.props;
        return this.valueToChar(value) + suits[suit].name.charAt(0).toUpperCase();
    }

    cardText() {
        const {suit, value} = this.props;
        return `${this.valueToChar(value)} of ${suits[suit].name}`;
    }

    render() {
        return <img style={cardStyle} onClick={(card) => this.props.onClick(this.props)} className='' alt={this.cardText()} src={this.imgPath(`./${this.cardImgTag()}.svg`)}></img>;
    }
}