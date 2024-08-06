import React from "react";

function Navigation() {
  return (
    <>
      <nav className="bg-red-600 w-full py-5 px-3 flex justify-between text-white">
        <div className="font-bold text-xl">BOOTCAMP BATCH 10 - REACT.JS</div>

        <div className="flex space-x-3 text-xl">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
