import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <nav className="bg-red-600 w-full py-5 px-3 flex justify-between text-white">
        <div className="font-bold text-xl">BOOTCAMP BATCH 10 - REACT.JS</div>
        <div className="flex space-x-3 text-xl">
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/clicked"}>Clicked</Link>
          <Link to={"/time"}>Time</Link>
        </div>
      </nav>
    );
  }
}

export default Navigation;
