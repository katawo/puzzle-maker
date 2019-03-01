import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { distinctNotCaseSensitive } from '../../../util';
import NumericInput from 'react-numeric-input';

const DEFAULT_LIMMITED_TIME = 3;

export default class GameMaking extends Component {
  state = {
    gameTitle: '',
    textValue: '',
    limittedTime: DEFAULT_LIMMITED_TIME
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
    // split
    // trim
    // remove empty items
    // distinct
    let words = this.state.textValue
      .split(/,|\n/)
      .map(w => w.trim())
      .filter(x => x);

    words = distinctNotCaseSensitive(words);

    if (words.length === 0) return;

    this.props.onMakeGame(
      words,
      this.state.gameTitle,
      this.state.limittedTime * 60 * 1000
    );
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
            Separated by comma (,) or line
          </Form.Text>
          <br />
          <Form.Row>
            <Col sm={{ span: 'auto', offset: 4 }}>
              <Form.Text>Limmited Time:</Form.Text>
            </Col>
            <Col sm={{ span: '1' }}>
              <NumericInput
                className="form-control"
                value={this.state.limittedTime}
                min={0.5}
                max={100}
                step={0.5}
                precision={1}
                snap
                onChange={value => {
                  this.setState({
                    limittedTime: value
                  });
                }}
              />
            </Col>
            <Col sm={{ span: 'auto' }}>
              <Form.Text>in minutes</Form.Text>
            </Col>
          </Form.Row>
          <br />
          <Button
            variant="success"
            onClick={() => {
              this.makeGame();
            }}
            disabled={!this.state.textValue.trim()}
          >
            Generate
          </Button>
        </Form>
      </div>
    );
  }
}
