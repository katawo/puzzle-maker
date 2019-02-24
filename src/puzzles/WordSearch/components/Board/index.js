import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import _ from 'lodash';
import { generateBoard } from '../../builder';

export default class BoardContainer extends Component {
  static propTypes = {
    words: PropTypes.array.isRequired,
    onWordFound: PropTypes.func,
    onCompleted: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedCells: [],
      wordsFound: [],
      board: generateBoard(props.words)
    };
    // console.log(props, this.state);
  }

  findFoundKeyInBox = boxData => {
    const { tags } = boxData;
    return tags.reduce((sum, value) => {
      if (this.state.wordsFound.includes(value.key)) {
        return sum + value.key;
      }
      return sum;
    }, '');
  };

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
      this.handleSelectedCellsChanged
    );
  };

  handleSelectedCellsChanged = () => {
    const completedKey = this.checkWordComplete();
    // console.log('>>> completedKey: ', completedKey);

    if (_.isNumber(completedKey)) {
      console.log('congratulation >>> you found one word');
      this.setState(
        {
          selectedCells: [],
          wordsFound: [...this.state.wordsFound, completedKey]
        },
        this.handleWordFound
      );
    }
  };

  handleWordFound = key => {
    this.props.onWordFound(key);
    const { wordsFound } = this.state;
    if (
      wordsFound.length > 0 &&
      wordsFound.length === this.props.words.length
    ) {
      this.props.onCompleted();
    }
  };

  checkWordComplete = () => {
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
  };

  render() {
    return (
      <Board
        board={this.state.board}
        onCellToggled={this.handleCellToggled}
        findFoundKeyInBox={this.findFoundKeyInBox}
      />
    );
  }
}
