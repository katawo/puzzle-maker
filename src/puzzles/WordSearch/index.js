import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Button, Col } from 'react-bootstrap';
import WordBox from '../components/WordBox';
// import words from './sample';
import { generateBoard } from './builder';
import _ from 'lodash';

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

/* eslint-disable react/prefer-stateless-function */
class WordSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      words: [],
      selectedCells: [],
      wordsFound: []
    };
  }

  generateRow(arr, index) {
    const items = [];
    for (let i = 0; i < arr.length; i++) {
      items.push(
        <WordBox
          value={arr[i]}
          key={i}
          onToggled={this.handleCellToggled}
          completed={_.includes(this.state.wordsFound, arr[i].key)}
        />
      );
    }
    return <RowContainer key={index}>{items}</RowContainer>;
  }

  handleCellToggled = (value, state) => {
    console.log('cell toggled >>> ', value, state);
    let selectedCells;
    if (state) {
      selectedCells = [...this.state.selectedCells, value];
    } else {
      selectedCells = this.state.selectedCells.filter(
        x => !_.isEqual(x, value)
      );
    }

    this.setState(
      {
        selectedCells
      },
      () => {
        const completedKey = this.checkWordComplete();
        console.log('>>> completedKey: ', completedKey);

        if (_.isNumber(completedKey)) {
          console.log('congratulation >>> you found one word');
          this.setState({
            selectedCells: [],
            wordsFound: [...this.state.wordsFound, completedKey]
          });
        }
      }
    );
  };

  checkWordComplete() {
    const { selectedCells } = this.state;
    // same key
    // num of items = checkSum
    // key > 0
    if (selectedCells && selectedCells.length > 0) {
      const { key, checkSum } = selectedCells[0];
      if (key >= 0 && checkSum === selectedCells.length) {
        const sameKey = _.every(selectedCells, x => x.key === key);
        if (sameKey) {
          return key;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  generate() {
    if (!this.state.textValue) return;

    const words = this.state.textValue.split('\n');
    const board = generateBoard(words);
    this.setState({
      words,
      board
    });
  }

  handleChange(event) {
    const textValue = event.target.value;
    this.setState({ textValue });
    // console.log("value >>> ", textValue);
  }

  render() {
    // console.log('board rendering >>> ', this.state);

    const boxes = [];
    const { board } = this.state;
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
        <div style={{ display: 'table', margin: '0 auto' }}>{boxes}</div>
      </div>
    );
  }
}

WordSearch.propTypes = {};

export default WordSearch;
