import React from "react";

var styles = {
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        width: "96%",
        margin: "0 auto",
        }
}

export class AppHeader extends React.Component {
        render() {
                return (
                        <div style={styles.title}>
                            <span>tupelo</span>
                        </div>
                );
        }
}
