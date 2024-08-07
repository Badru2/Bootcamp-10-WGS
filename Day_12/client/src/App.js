import "./App.css";
import Navigation from "./components/navigation";
import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Clicked from "./pages/Clicked";
import Time from "./pages/Time";

class App extends Component {
  render() {
    return (
      <Router>
        <Navigation />
        <div className="px-4 mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/clicked" element={<Clicked />} />
            <Route path="/time" element={<Time />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
