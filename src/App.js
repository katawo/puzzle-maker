import React, { Component } from 'react';
// import logo from "./logo.svg";
import './App.css';
// import WordSearch from './puzzles/WordSearch';
import DailyPlan from './small-tools/DailyPlan';
import { Container } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <Container maxWidth="md">
        <div className="Daily-tasks">
          {/* <WordSearch /> */}
          <DailyPlan />
          <br />
          <br />
        </div>
      </Container>
    );
  }
}

export default App;
