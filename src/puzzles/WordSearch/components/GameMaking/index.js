import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { toUnsigendVietnamese } from "../../../util";

export default class GameMaking extends Component {
  state = {
    gameTitle: "",
    textValue: ""
  };

  handleWordsChange(event) {
    const value = event.target.value;
    this.setState({ textValue: value });
  }

  handleGameTitleChange(event) {
    const value = event.target.value;
    this.setState({ gameTitle: value });
  }

  makeGame() {
    if (!this.state.textValue) return;
    // Remove spaces
    // split by comma or line
    // remove empty items
    const unsignedText = toUnsigendVietnamese(this.state.textValue);
    // console.log({ unsignedText, replace: unsignedText.replace(/ */g, "") });

    const words = unsignedText
      .replace(/ */g, "")
      .split(/,|\n/)
      .filter(x => x);
    if (words.length === 0) return;

    this.props.onMakeGame(words, this.state.gameTitle);
  }

  render() {
    return (
      <div>
        <h1>WordSearch generator</h1>
        <br />
        <Form>
          <Form.Row>
            <Col sm={{ span: 4, offset: 4 }}>
              <Form.Control
                size="lg"
                type="text"
                placeholder="What's the topic?"
                value={this.state.gameTitle}
                onChange={e => this.handleGameTitleChange(e)}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col sm={{ span: 4, offset: 4 }}>
              <Form.Control
                size="lg"
                placeholder="Enter the list of words"
                value={this.state.textValue}
                onChange={e => this.handleWordsChange(e)}
                as="textarea"
                rows="6"
              />
            </Col>
          </Form.Row>
          <Form.Text className="text-muted">
            Separated by comma (,) or by line
          </Form.Text>
          <br />
          <Button
            variant="success"
            onClick={() => {
              this.makeGame();
            }}
          >
            Make game
          </Button>
        </Form>
      </div>
    );
  }
}
