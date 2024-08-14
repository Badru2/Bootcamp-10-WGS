import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state);

  return (
    <div style={{ textAlign: "center", width: "15%" }}>
      <span style={{ fontSize: "50px" }}>{count}</span>
      <div>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>
          Increment
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          style={{ margin: "0px 5px" }}
        >
          Reset
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Counter;
