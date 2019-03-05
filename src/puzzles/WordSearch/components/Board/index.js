import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import _ from 'lodash';
import { generateBoard } from '../../builder';
import { toUnsignedVietnamese } from '../../../util';
import { findTextInWords } from '../../wordDetection';

export default class BoardContainer extends Component {
  static propTypes = {
    words: PropTypes.array.isRequired,
    onWordFound: PropTypes.func,
    disabled: PropTypes.bool
  };

  _formattedWords = [];

  constructor(props) {
    super(props);

    this._formattedWords = props.words.map((x, index) => {
      const formattedText = toUnsignedVietnamese(x)
        .replace(/ */g, '')
        .toUpperCase();
      return { text: formattedText, key: index };
    });

    const { board, renderFailed } = generateBoard([...this._formattedWords]);

    this.state = {
      selectedCells: [],
      wordsFound: [],
      board,
      renderFailed: renderFailed,
      foundCells: []
    };

    props.onFinishRender(renderFailed);
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
      this.handleSelectedCellsChanged
    );
  };

  handleSelectedCellsChanged = () => {
    const foundWord = this.checkWordComplete();
    const completedKey = foundWord && foundWord.key;
    // console.log('>>> completedKey: ', completedKey);

    if (_.isNumber(completedKey)) {
      console.log('congratulation >>> you found one word');
      this.setState(
        {
          selectedCells: [],
          wordsFound: [...this.state.wordsFound, completedKey],
          foundCells: [
            ...this.state.foundCells,
            {
              key: completedKey,
              cells: this.state.selectedCells
            }
          ]
        },
        () => {
          this.props.onWordFound(this.state.wordsFound);
          _.find(
            this._formattedWords,
            x => x.key === completedKey
          ).found = true;
        }
      );
    }
  };

  checkWordComplete = () => {
    return findTextInWords(
      this.state.selectedCells,
      this._formattedWords.filter(x => !x.found)
    );
  };

  render() {
    return (
      <Board
        board={this.state.board}
        onCellToggled={this.handleCellToggled}
        findFoundKeyInBox={this.findFoundKeyInBox}
        disabled={this.props.disabled}
        foundCells={this.state.foundCells}
      />
    );
  }
}
