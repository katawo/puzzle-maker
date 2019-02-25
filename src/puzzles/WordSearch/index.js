import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Form, Button, Col, Alert } from "react-bootstrap";
import GamePlayingContainer from "./GamePlaying";

/* eslint-disable react/prefer-stateless-function */

const GameStatus = {
  Making: 0,
  Playing: 1
};

class WordSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      // boardId: 0,
      gameEnded: false,
      gameStatus: GameStatus.Making
    };
  }

  generate() {
    if (!this.state.textValue || !this.state.textValue.trim()) return;

    const words = this.state.textValue.split("\n").filter(x => x.trim() !== "");
    // const board = generateBoard(words);
    this.setState({
      words: words.map(x => x.trim()),
      boardId: this.state.boardId + 1,
      gameEnded: false,
      gameStatus: GameStatus.Playing,
      wordsFound: []
    });
  }

  handleChange(event) {
    const textValue = event.target.value;
    this.setState({ textValue });
    // console.log("value >>> ", textValue);
  }

  handleGameEnded = () => {
    this.setState({
      gameEnded: true
    });
  };

  render() {
    return (
      <div>
        {this.state.gameStatus === GameStatus.Making && (
          <div>
            <h1>WordSearch generator</h1>
            <Form>
              <Form.Label>Enter the word list (1 word per line)</Form.Label>
              <Form.Row>
                <Col sm="4" />
                <Col sm="4">
                  <Form.Control
                    as="textarea"
                    rows="6"
                    value={this.state.textValue}
                    onChange={e => this.handleChange(e)}
                  />
                </Col>
              </Form.Row>
              <br />
              <Button
                variant="success"
                onClick={() => {
                  this.generate();
                }}
              >
                Generate
              </Button>
            </Form>
          </div>
        )}
        <br />
        {/* <Row>
          <Col sm="6"> */}
        {this.state.gameStatus === GameStatus.Playing && (
          <GamePlayingContainer
            words={this.state.words}
            onRemake={() =>
              this.setState({
                gameStatus: GameStatus.Making
              })
            }
          />
        )}
        {/* </Col>
        </Row> */}
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

WordSearch.propTypes = {};

export default WordSearch;
