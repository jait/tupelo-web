import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export class EventLog extends React.Component {

    constructor(props) {
        super(props);
        this.textLog = React.createRef();
    }

    componentDidUpdate() {
        this.textLog.current.scrollTop = this.textLog.current.scrollHeight;
    }

    render() {
        return (<textarea ref={this.textLog} style={{whiteSpace: "pre-line"}} readonly="true" className="overflow-auto" value={this.props.content}/>);
    }
}