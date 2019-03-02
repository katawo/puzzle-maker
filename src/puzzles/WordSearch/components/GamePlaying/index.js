import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
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
        timeup: false
      },
      completed: false,
      renewConfirmationShow: false
    };
  }

  handleGameEnded = () => {
    const { wordsFound, failedIndexs } = this.state;
    if (wordsFound.length + failedIndexs.length === this.props.words.length) {
      this.setState(
        {
          completed: true
        },
        () => {
          this._countdown.pause();
        }
      );
    }
  };

  remake = () => {
    this.setState({
      wordsFound: [],
      boardId: this.state.boardId + 1,
      timer: {
        startedTime: Date.now(),
        timeup: false
      },
      completed: false
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
        timeup: true
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

  handleCancel = () => {
    this.setState({
      renewConfirmationShow: false
    });
  };

  handleConfirm = () => {
    this.setState(
      {
        renewConfirmationShow: false
      },
      this.props.onNewGame
    );
  };

  handleRenewClick = () => {
    const isPlaying = !this.state.completed && this.state.wordsFound.length > 0;
    if (isPlaying) {
      this.setState({
        renewConfirmationShow: true
      });
    } else {
      this.props.onNewGame();
    }
  };

  render() {
    const { words } = this.props;
    return (
      <div>
        <h1>{this.props.topic || 'Have fun'}</h1>
        <h2>
          <Countdown
            date={this.state.timer.startedTime + this.props.duration}
            onComplete={this.handleTimeUp}
            renderer={CustomizedCountDown}
            key={this.state.timer.startedTime}
            ref={countdown => (this._countdown = countdown)}
          />
        </h2>
        {this.state.completed && (
          <h3>
            <span style={{ color: 'green' }}>Congratulation!</span>
          </h3>
        )}
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Board
            disabled={this.state.timer.timeup || this.state.completed}
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
              onClick={this.handleRenewClick}
              // disabled={!this.state.timer.timeup && !this.state.completed}
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
            <div style={{ float: 'left' }}>
              Found words:{' '}
              <strong>
                {this.state.wordsFound.length}/
                {words.length - this.state.failedIndexs.length}
              </strong>
            </div>
            <br />
            {this.renderWordList()}
            <br />
            {this.state.failedIndexs.length > 0 && (
              <div style={{ color: 'red' }}>
                There are {this.state.failedIndexs.length} word(s) failed to
                render. You can play with the rendered words or click{' '}
                <span style={{ color: 'blue' }}>Remake</span> button to try
                again.
              </div>
            )}
          </div>
        </div>
        <br />
        <br />
        <Modal
          show={this.state.renewConfirmationShow}
          onHide={this.handleCancel}
        >
          <Modal.Header closeButton>
            <Modal.Title>Renew</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you really want to renew the game?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleConfirm}>
              Renew
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
