import React from "react";

const Navigation = () => {
  return (
    <>
      <nav className="flex justify-between p-5 bg-blue-500 text-white">
        <h3 className="font-bold static">
          BOOTCAMP BATCH 10: Experiment with REACT.JS
        </h3>
        <div className="flex space-x-3">
          <a href="http://localhost:3001/home">home</a>
          <a href="./about.js">about</a>
          <a href="http://localhost:3001/contact">contact</a>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
