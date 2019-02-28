import React, { Component } from 'react';
import { Button, ListGroup, Alert } from 'react-bootstrap';
import Board from '../Board';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown-now';
import CustomizedCountDown from './CustomizedCountDown';

export default class GamePlayingContainer extends Component {
  static propTypes = {
    words: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      gameEnded: false,
      wordsFound: [],
      boardId: 0,
      failedIndexs: [],
      timeUp: false
    };
  }

  handleGameEnded = () => {
    const { wordsFound, failedIndexs } = this.state;
    if (wordsFound.length + failedIndexs.length === this.props.words.length) {
      this.setState({
        gameEnded: true
      });
    }
  };

  remake = () => {
    this.setState({
      gameEnded: false,
      wordsFound: [],
      boardId: this.state.boardId + 1,
      timeUp: false
    });
    // TODO: reset timer
  };

  handleRenderFailed = indexs => {
    // console.log({ indexs });
    this.setState({
      failedIndexs: indexs
    });
  };

  handleTimeUp = () => {
    this.setState({
      timeUp: true
    });
  };

  render() {
    const { words } = this.props;
    return (
      <div>
        <h1>{this.props.topic || 'Have fun'}</h1>
        <h2>
          <Countdown
            date={Date.now() + 3000}
            renderer={CustomizedCountDown}
            onComplete={this.handleTimeUp}
          />
        </h2>
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Board
            disabled={this.state.timeUp}
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
              disabled={!this.state.gameEnded}
            >
              New game
            </Button>
            <Button
              variant="success"
              onClick={this.remake}
              // disabled={!this.state.gameEnded}
              style={{ marginLeft: '10px' }}
            >
              Remake
            </Button>
            <br />
            <br />
            <ListGroup>
              {words.map((w, index) => {
                return (
                  <ListGroup.Item
                    as="li"
                    key={index}
                    variant={
                      this.state.failedIndexs.includes(index)
                        ? 'warning'
                        : this.state.wordsFound &&
                          this.state.wordsFound.includes(index)
                        ? 'dark'
                        : ''
                    }
                  >
                    {w}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        </div>
        <br />
        <br />
        {this.state.gameEnded && (
          <Alert dismissible variant="primary">
            <Alert.Heading>Congratulation!</Alert.Heading>
            <p>You have found all the words</p>
          </Alert>
        )}
      </div>
    );
  }
}
