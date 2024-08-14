import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return (state = 0);
    default:
      return state;
  }
};

const store = createStore(rootReducer, composeWithDevTools());

export default store;
