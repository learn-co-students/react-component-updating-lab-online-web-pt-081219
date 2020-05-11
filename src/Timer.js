import React, { Component } from "react";

class Timer extends Component {
  constructor() {
    super();
    this.timer = React.createRef();
    this.state = {
      time: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    };
  }

  //Your code here

  componentDidMount() {
    console.log("Time Component Did Mount")
    this.interval = setInterval(
      this.clockTick,
      this.props.updateInterval * 1000
    );
  }

  componentWillUnmount() {
    console.log("Timer Component Will Unmount")
    clearInterval(this.interval);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Timer Should Component Update")
    if (this.state.time === nextState.time) {
      return false
    }
    return true
  }

  componentDidUpdate() {
    console.log("Timer Component Did Update")
  }


  render() {
    console.log("Timer Component Render")
    const { time, color, logText } = this.state;
    return (
      <section className="Timer" style={{ background: color }} ref={this.timer}>
        <h1>{time}</h1>
        <button onClick={this.stopClock}>Stop</button>
        <aside className="logText">{logText}</aside>
        <small onClick={this.handleClose}>X</small>
      </section>
    );
  }

  clockTick = () => {
    this.setState(prevState => ({
      time: prevState.time + this.props.updateInterval
    }));
  };

  stopClock = () => {
    console.log(`this is stop clock ${this.interval}`)
    clearInterval(this.interval);
    this.setState({ className: "hidden" });
  };

  // for the 'x' button,
  handleClose = () => {
    this.props.removeTimer(this.props.id);
  };
}

export default Timer;
