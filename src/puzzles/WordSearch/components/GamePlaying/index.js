import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Board from '../Board';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';
import CustomizedCountDown from './CustomizedCountDown';
import WordList from './components/WordList';

export default class GamePlayingContainer extends Component {
  static propTypes = {
    words: PropTypes.array.isRequired,
    duration: PropTypes.number
  };

  static defaultProps = {
    duration: 3000
  };

  constructor(props) {
    super(props);
    this.state = {
      wordsFound: [],
      boardId: 0,
      failedIndexs: [],
      timer: {
        startedTime: Date.now(),
        ended: false
      }
    };
  }

  handleGameEnded = () => {
    const { wordsFound, failedIndexs } = this.state;
    if (wordsFound.length + failedIndexs.length === this.props.words.length) {
      this.setState({
        timer: {
          ended: true
        }
      });
    }
  };

  remake = () => {
    this.setState({
      wordsFound: [],
      boardId: this.state.boardId + 1,
      timer: {
        startedTime: Date.now(),
        ended: false
      }
    });
  };

  handleRenderFailed = indexs => {
    // console.log({ indexs });
    this.setState({
      failedIndexs: indexs
    });
  };

  handleTimeUp = () => {
    this.setState({
      timer: {
        ...this.state.timer,
        ended: true
      }
    });
  };

  renderWordList() {
    const { words } = this.props;
    const { failedIndexs, wordsFound } = this.state;

    const NUM_OF_ITEMS_IN_COL = 7;
    const numOfColumn = Math.ceil(words.length / NUM_OF_ITEMS_IN_COL);
    // console.log({ numOfColumn });

    const cols = [];
    for (let i = 0; i < numOfColumn; i++) {
      cols.push([]);
    }

    words.forEach((word, index) => {
      const item = {
        value: word,
        notRendered: failedIndexs.includes(index),
        found: wordsFound && wordsFound.includes(index)
      };

      const colIndex = index % numOfColumn;
      cols[colIndex].push(item);
    });

    return (
      <div style={{ display: 'flex' }}>
        {cols.map((x, index) => {
          return (
            <div key={index} style={{ marginRight: '20px' }}>
              <WordList words={x} />
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { words } = this.props;
    return (
      <div>
        <h4>{this.props.topic || 'Have fun'}</h4>
        <h2>
          {(this.state.timer && this.state.timer.startedTime && (
            <Countdown
              date={this.state.timer.startedTime + this.props.duration}
              onComplete={this.handleTimeUp}
              renderer={CustomizedCountDown}
              key={this.state.timer.startedTime}
            >
              {/* <Completionist /> */}
            </Countdown>
          )) || <span style={{ color: 'green' }}>'Congratulation!'</span>}
        </h2>
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Board
            disabled={this.state.timer.ended}
            key={this.state.boardId}
            words={words}
            onWordFound={wordsFound => {
              this.setState({ wordsFound }, this.handleGameEnded);
            }}
            onFinishRender={this.handleRenderFailed}
          />
          <div>
            <Button
              variant="success"
              onClick={this.props.onNewGame}
              disabled={!this.state.timer.ended}
            >
              New game
            </Button>
            <Button
              variant="success"
              onClick={this.remake}
              style={{ marginLeft: '10px' }}
            >
              Remake
            </Button>
            <br />
            <br />
            {this.renderWordList()}
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}
