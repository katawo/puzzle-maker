import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";

export default class GameMaking extends Component {
  state = {
    textValue: ""
  };

  handleChange(event) {
    const textValue = event.target.value;
    this.setState({ textValue });
  }

  makeGame() {
    if (!this.state.textValue) return;
    const words = this.state.textValue.split("\n").filter(x => x.trim() !== "");
    if (words.length === 0) return;

    this.props.onMakeGame(words);
  }

  render() {
    return (
      <div>
        <h1>WordSearch generator</h1>
        <Form>
          <Form.Label>Enter the word list (1 word per line)</Form.Label>
          <Form.Row>
            <Col sm={{ span: 4, offset: 4 }}>
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
              this.makeGame();
            }}
          >
            Generate
          </Button>
        </Form>
      </div>
    );
  }
}
