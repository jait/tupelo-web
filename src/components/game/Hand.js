import React from "react";
import {Card} from './Card'


const handStyle = {
    marginLeft: "auto",
    marginrRight: "auto",
    justifyContent: "center",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,  minmax(10px, max-content))"
};

export class Hand extends React.Component {

    toggleCardHover(card) {

    }
    render() {
        const {hand, onSelectCard, enableSelect} = this.props;
        return (<div style={handStyle}>
            {hand.map((card) => <Card key={`${card.suit}${card.value}`} hover={enableSelect} className="ml-n3" onClick={enableSelect ? (card) => onSelectCard(card) : null} {...card}/>)}
            </div>
            );
    }
}