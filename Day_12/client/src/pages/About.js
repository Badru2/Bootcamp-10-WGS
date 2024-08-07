import React, { Component } from "react";

class About extends Component {
  render() {
    const name = "Hilal Badru";
    const batch = "Batch 10";

    return (
      <div className="">
        <h2 className="text-xl">
          Hi Nama Saya <b>{name}</b>
        </h2>
        <h2 className="text-xl">
          Saya peserta bootcamp <b>{batch}</b>
        </h2>
      </div>
    );
  }
}

export default About;
