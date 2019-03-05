import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WordBox from '../../../components/WordBox';
import _ from 'lodash';

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

function Board({ board, onCellToggled, disabled, foundCells }) {
  const findMatchedCells = (cellValue, foundCells) => {
    const cells = foundCells.filter(x => {
      const cell = _.find(x.cells, c =>
        _.isEqual(c.position, cellValue.position)
      );
      return cell !== undefined;
    });
    return cells;
  };

  const generateRow = (arr, index) => {
    const items = [];
    for (let i = 0; i < arr.length; i++) {
      const cellValue = arr[i];
      const matchedCells = findMatchedCells(cellValue, foundCells);
      // console.log({ matchedCells });

      const cellKey =
        i.toString() +
        (matchedCells && matchedCells.reduce((s, value) => s + value, ''));

      items.push(
        <WordBox
          value={cellValue}
          key={cellKey} // to re-instantiate component
          onToggled={onCellToggled}
          completed={matchedCells && matchedCells.length > 0}
          disabled={disabled}
        />
      );
    }

    return <RowContainer key={index}>{items}</RowContainer>;
  };

  const boxes = [];
  for (let i = 0; i < board.length; i++) {
    boxes.push(generateRow(board[i], i));
  }

  return (
    <div style={{ margin: '0 15px 0 0' }}>
      <div
        style={{
          paddingTop: '1px',
          paddingRight: '1px',
          background: 'black'
        }}
      >
        {boxes}
      </div>
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  onCellToggled: PropTypes.func,
  findFoundKeyInBox: PropTypes.func
};

export default Board;
