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
      renderFailed: renderFailed
    };

    props.onFinishRender(renderFailed);
  }

  findFoundKeyInBox = boxData => {
    // const { tags } = boxData;
    // return tags.reduce((sum, value) => {
    //   if (this.state.wordsFound.includes(value.key)) {
    //     return sum + value.key;
    //   }
    //   return sum;
    // }, '');
    return '';
  };

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
          wordsFound: [...this.state.wordsFound, completedKey]
        },
        () => {
          this.props.onWordFound(this.state.wordsFound);
          _.remove(this._formattedWords, x => x.key === completedKey);
        }
      );
    }
  };

  checkWordComplete = () => {
    return findTextInWords(this.state.selectedCells, this._formattedWords);
  };

  // checkWordComplete = () => {
  //   const { selectedCells } = this.state;
  //   // same key
  //   // num of items = checkSum
  //   // key > 0
  //   if (selectedCells && selectedCells.length > 0) {
  //     const { tags } = selectedCells[0];
  //     let foundKey = null;
  //     // console.log('tags ', tags, selectedCells);
  //     tags.forEach(({ key, checkSum }) => {
  //       if (key >= 0 && checkSum === selectedCells.length) {
  //         const sameKey = _.every(selectedCells, cell =>
  //           _.some(cell.tags, tag => tag.key === key)
  //         );
  //         // console.log('tag >>> ', { key, checkSum, sameKey });
  //         if (sameKey) {
  //           foundKey = key;
  //           return;
  //         }
  //       }
  //     });

  //     return foundKey;
  //   } else {
  //     return null;
  //   }
  // };

  render() {
    return (
      <Board
        board={this.state.board}
        onCellToggled={this.handleCellToggled}
        findFoundKeyInBox={this.findFoundKeyInBox}
        disabled={this.props.disabled}
      />
    );
  }
}
