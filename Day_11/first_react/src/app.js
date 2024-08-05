// export const Element = <h1>This is NodeJS</h1>;
import React from "react";
import Layout from "./layout";
import "./css/output.css";

const App = () => {
  return (
    <>
      <Layout />
      <p className="mx-5 pt-4 font-bold text-3xl outline-slate-800 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
        This is REACT<span className="text-black drop-shadow-none">.</span>JS
      </p>
    </>
  );
};

export default App;
