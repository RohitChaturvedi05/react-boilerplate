import React from "react"


export default class Clock extends React.Component {
    interval;
    constructor(props) {
        super(props)
        this.state = { date: new Date().toLocaleTimeString() }

    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({ date: new Date().toLocaleTimeString() })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (<h1>{this.state.date}</h1>)
    }


}

