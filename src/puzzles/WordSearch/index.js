import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import GamePlayingContainer from './components/GamePlaying';
import GameMaking from './components/GameMaking';

/* eslint-disable react/prefer-stateless-function */

const GameStatus = {
  Making: 0,
  Playing: 1
};

class WordSearch extends React.Component {
  state = {
    words: [],
    gameStatus: GameStatus.Making
  };

  makeGame = (words, topic, limittedTime) => {
    this.setState({
      words,
      topic,
      limittedTime,
      gameEnded: false,
      gameStatus: GameStatus.Playing
    });
  };

  render() {
    return (
      <div>
        {this.state.gameStatus === GameStatus.Making && (
          <GameMaking onMakeGame={this.makeGame} />
        )}
        <br />
        {this.state.gameStatus === GameStatus.Playing && (
          <GamePlayingContainer
            words={this.state.words}
            topic={this.state.topic}
            onNewGame={() =>
              this.setState({
                gameStatus: GameStatus.Making
              })
            }
            duration={this.state.limittedTime}
          />
        )}
      </div>
    );
  }
}

WordSearch.propTypes = {};

export default WordSearch;
