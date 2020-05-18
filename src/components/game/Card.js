import React from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group'

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
    maxHeight: "8rem",
    userSelect: "none"
};

export class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }

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

    useHover() {

        const onMouseEnter = () => {
            //console.log("enter");
            this.setState({hover: true});
        };

        const onMouseLeave = () => {
            this.setState({hover: false});
        };

        const hoverStyle = this.state.hover? {
            transition: 'transform .2s ease-in-out',
            //'transition-delay': ".1s",
            transform: 'translateY(-1rem)',
            cursor: 'pointer',
            zIndex: 1,
            position: 'relative'
        } : {
            transition: 'transform .2s ease-in-out',
            //'transition-delay': '.1s',
            cursor: 'default',
            zIndex: 1,
            position: 'relative'
        };

        return { hoverStyle, onMouseEnter, onMouseLeave };
    };


    render() {
        const { onClick, hover } = this.props;
        const { hoverStyle, ...hoverProps } = hover ? this.useHover() : {};
        return (
            <TransitionGroup>
                <CSSTransition
                key={this.cardImgTag()}
                classNames="card-on-table"
                appear={true}
                timeout={400}
                enter={false}
                leave={false}>
                <img className="shadow-sm" draggable="false"
                    style={{...cardStyle, ...hoverStyle}}
                    {...hoverProps}
                    onClick={onClick ? (card) => this.props.onClick(this.props) : null}
                    alt={this.cardText()}
                    src={this.imgPath(`./${this.cardImgTag()}.svg`)}></img>
                </CSSTransition>
            </TransitionGroup>
            );
    }
}