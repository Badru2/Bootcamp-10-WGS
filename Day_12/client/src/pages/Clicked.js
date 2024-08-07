import React, { Component } from "react";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      size: 17,
    };
  }
  render() {
    return (
      <div>
        <h1 className={"font-bold " + `text-[${this.state.size}px]`}>
          you clicked {this.state.count} times
        </h1>
        <button
          onClick={() =>
            this.setState({
              count: this.state.count + 1,
              size: this.state.size + 1,
            })
          }
          className="px-4 py-2 bg-blue-500 font-bold rounded-sm text-white mt-3"
        >
          +
        </button>

        <button
          onClick={() =>
            this.setState({
              count: this.state.count - 1,
              size: this.state.size - 1,
            })
          }
          className="px-4 py-2 bg-yellow-500 font-bold rounded-sm text-white mt-3 ms-12"
        >
          -
        </button>
      </div>
    );
  }
}

export default Contact;
