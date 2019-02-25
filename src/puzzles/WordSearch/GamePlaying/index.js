import React, { Component } from "react";
import { Button, ListGroup, Alert } from "react-bootstrap";
import Board from "../components/Board";
import PropTypes from "prop-types";

export default class GamePlayingContainer extends Component {
  static propTypes = {
    words: PropTypes.array.isRequired
    // onWordFound: PropTypes.func,
    // onCompleted: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      //   boardId: 0,
      gameEnded: false,
      wordsFound: []
    };
  }

  handleGameEnded = () => {
    this.setState({
      gameEnded: true
    });
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
            onCompleted={this.handleGameEnded}
            // key={this.state.boardId}
            onWordFound={wordsFound => {
              // console.log("on word found");
              this.setState({ wordsFound });
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
