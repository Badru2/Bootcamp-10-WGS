import React, { Component } from "react";

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateState: new Date(),
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({ dateState: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { dateState } = this.state;

    return (
      <div>
        <p>
          {dateState.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: "long",
          })}
        </p>
        <p>
          {dateState.toLocaleString("id-ID", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })}
        </p>
      </div>
    );
  }
}

export default Time;
