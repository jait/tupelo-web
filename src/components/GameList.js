import React from "react";

var styles = {
    title: {

    }
};

export class GameList extends React.Component {
    render() {
        var {
            games
        } = this.props;

        var listItems = games.map((game) =>
            <tr>{game.players.map((player) => { return player.name; }).join(", ")}</tr>
            );

        return (
            <div>
                <div style={styles.title}>List of games</div>
                <table>
                    <tbody>
                    {listItems}
                    </tbody>
                </table>
            </div>
        );
    }
}
