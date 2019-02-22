import React from "react";
// import PropTypes from 'prop-types';
import styled from "styled-components";
import { Form, Button, Col } from "react-bootstrap";
import WordBox from "../components/WordBox";
// import words from './sample';
import { generateBoard } from "./builder";

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

/* eslint-disable react/prefer-stateless-function */
class WordSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: []
    };
  }

  generateRow(arr, index) {
    const items = [];
    for (let i = 0; i < arr.length; i++) {
      items.push(<WordBox value={arr[i]} key={i} />);
    }
    return <RowContainer key={index}>{items}</RowContainer>;
  }

  generate() {
    if (!this.state.textValue) return;
    this.setState({
      words: this.state.textValue.split("\n")
    });
  }

  handleChange(event) {
    const textValue = event.target.value;
    this.setState({ textValue, words: [] });
    // console.log("value >>> ", textValue);
  }

  render() {
    // console.log('crossword rendering');

    const boxes = [];
    const board = generateBoard(this.state.words, 10);
    for (let i = 0; i < board.length; i++) {
      boxes.push(this.generateRow(board[i], i));
    }

    return (
      <div>
        <h1>WordSearch generator</h1>
        <Form>
          <Form.Label>Enter the word list (1 word per line)</Form.Label>
          <Form.Row>
            <Col sm="4" />
            <Col sm="4">
              <Form.Control
                as="textarea"
                rows="10"
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
        <br />
        <div style={{ display: "table", margin: "0 auto" }}>{boxes}</div>
      </div>
    );
  }
}

WordSearch.propTypes = {};

export default WordSearch;
