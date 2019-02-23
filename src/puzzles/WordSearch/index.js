import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import WordBox from '../components/WordBox';
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
      wordsFound: [],
      boardId: 1
    };
  }

  checkWordBoxComplete(tags) {
    for (let i = 0; i < tags.length; i++) {
      if (this.state.wordsFound.includes(tags[i].key)) {
        return tags[i].key;
      }
    }
    return '';
  }

  generateRow(arr, index) {
    const items = [];
    for (let i = 0; i < arr.length; i++) {
      const cellValue = arr[i];
      const foundKey = this.checkWordBoxComplete(cellValue.tags);
      const cellKey = i.toString() + foundKey.toString();
      items.push(
        <WordBox
          value={cellValue}
          key={cellKey} // to re-instantiate component
          onToggled={this.handleCellToggled}
          completed={_.isNumber(foundKey)}
        />
      );
    }
    return <RowContainer key={index}>{items}</RowContainer>;
  }

  handleCellToggled = (value, state) => {
    // console.log('cell toggled >>> ', value, state);
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
        // console.log('>>> completedKey: ', completedKey);

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
      const { tags } = selectedCells[0];
      let foundKey = null;
      // console.log('tags ', tags, selectedCells);
      tags.forEach(({ key, checkSum }) => {
        if (key >= 0 && checkSum === selectedCells.length) {
          const sameKey = _.every(selectedCells, cell =>
            _.some(cell.tags, tag => tag.key === key)
          );
          // console.log('tag >>> ', { key, checkSum, sameKey });
          if (sameKey) {
            foundKey = key;
            return;
          }
        }
      });

      return foundKey;
    } else {
      return null;
    }
  }

  generate() {
    if (!this.state.textValue) return;

    const words = this.state.textValue.split('\n').filter(x => x.trim() !== '');
    const board = generateBoard(words);
    this.setState({
      words: words.map(x => x.trim()),
      board,
      boardId: this.state.boardId + 1,
      wordsFound: []
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

    const { words, wordsFound } = this.state;
    const showCompletedMessage =
      wordsFound.length > 0 && wordsFound.length === words.length;

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
        <br />
        <div
          key={this.state.boardId} // re-render whenever board changes
          style={{ display: 'table', margin: '0 auto' }}
        >
          {boxes}
        </div>
        <br />
        <br />
        {showCompletedMessage && (
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
