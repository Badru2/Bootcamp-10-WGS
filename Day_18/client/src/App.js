import React from "react";
import Time from "./components/timer";
import Counter from "./pages/Counter";
import { Provider } from "react-redux";
import store from "./pages/store";
import UseState from "./pages/useState";
import FinalForm from "./pages/finalForm";

export default function App() {
  return (
    <div style={{ margin: "auto" }}>
      <UseState />
      <Time />
      <Provider store={store}>
        <Counter />
      </Provider>
      <FinalForm />
    </div>
  );
}
