import React, { Component } from "react";
import { Button, ListGroup, Alert } from "react-bootstrap";
import Board from "../Board";
import PropTypes from "prop-types";

export default class GamePlayingContainer extends Component {
  static propTypes = {
    words: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      gameEnded: false,
      wordsFound: []
    };
  }

  handleGameEndedhandleGameEnded = () => {
    const { wordsFound } = this.state;
    if (
      wordsFound.length > 0 &&
      wordsFound.length === this.props.words.length
    ) {
      this.setState({
        gameEnded: true
      });
    }
  };

  render() {
    const { words } = this.props;
    return (
      <div>
        <h1>Title should be here</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Board
            words={words}
            onWordFound={wordsFound => {
              this.setState({ wordsFound }, this.handleGameEnded);
            }}
          />
          <div>
            <ListGroup>
              {words.map((w, index) => {
                return (
                  <ListGroup.Item
                    key={index}
                    variant={
                      this.state.wordsFound &&
                      this.state.wordsFound.includes(index)
                        ? "dark"
                        : ""
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
        <Button variant="success" onClick={this.props.onRemake}>
          Remake
        </Button>
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
