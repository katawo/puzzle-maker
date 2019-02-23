import { randomChar } from '../util';
import { pickRandomDirection, pickRandomPosition } from './random-pick';
import { isValid } from './availability-checker';

function createCell(char, key = -1, checkSum = 0) {
  // Should have cellId
  return {
    char,
    tags: [{ key, checkSum }]
  };
}

function appendTagToCell(cell, key, checkSum) {
  cell.tags.push({
    key,
    checkSum
  });
  return cell;
}

export function generateBoard(words) {
  // calculate board size
  // init empty board
  // fill all the words from longest one
  // fill random chars to empty cells
  // return
  if (!words || words.length === 0) return [];
  console.log('generate board');

  words.sort((a, b) => a.length < b.length);
  const ADDITIONAL_CELL = 3;
  const size = words[0].length + ADDITIONAL_CELL;
  const board = initBoard(size);
  // console.log({ words, size });

  words
    .filter(x => x)
    .map(x => x.trim().toUpperCase())
    .forEach((w, index) => {
      tryToFillWordToBoard(board, w, index);
    });

  fillRandomChar(board);

  return board;
}

function initBoard(size) {
  const board = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(createCell(''));
    }
    board.push(row);
  }

  return board;
}

function fillRandomChar(board) {
  board.forEach(row => {
    for (let i = 0; i < row.length; i++) {
      if (row[i].char === '') {
        row[i].char = randomChar();
      }
    }
  });
}

function tryToFillWordToBoard(board, word, key) {
  // random direction
  // random position
  // check if availability
  // try some times
  // return success or not
  const MAX_TRY = 100;
  let count = 0;
  let direction;
  let position;
  const size = board.length;
  do {
    direction = pickRandomDirection();
    position = pickRandomPosition(size, word.length, direction);
    // console.log({ count, direction, position, word });
  } while (!isValid(board, word, direction, position) && ++count < MAX_TRY);

  if (count >= MAX_TRY) {
    // Ignore this word
    console.log('ignore the word >>>', word);

    return;
  }

  fillWordToBoard(board, word, direction, position, key);
}

function fillWordToBoard(board, word, direction, initPosition, key) {
  for (let i = 0; i < word.length; i++) {
    const xcell = initPosition.x + i * direction.x;
    const ycell = initPosition.y + i * direction.y;
    const cell = board[xcell][ycell];
    if (cell.char) {
      appendTagToCell(cell, key, word.length);
    } else {
      board[xcell][ycell] = createCell(word[i], key, word.length);
    }
  }
}
