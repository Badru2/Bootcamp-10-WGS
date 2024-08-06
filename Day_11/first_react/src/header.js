import React from "react";

const Navigation = () => {
  const header = "BOOTCAMP BATCH 10: Experiment with REACT.JS";
  return (
    <>
      <nav className="flex justify-between p-5 bg-blue-500 text-white">
        <h3 className="font-bold static">{header}</h3>
        <div className="flex space-x-3">
          <a href="./home">home</a>
          <a href="./about">about</a>
          <a href="./contact">contact</a>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
