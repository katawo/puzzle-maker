import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import WordSearch from "./puzzles/WordSearch";

class App extends Component {
  render() {
    return (
      <div className="App">
        <WordSearch />
        <br />
        <br />
      </div>
    );
  }
}

export default App;
