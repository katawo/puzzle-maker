import { randomChar } from '../util';
import { pickRandomDirection, pickRandomPosition } from './random-pick';
import { isValid } from './availability-checker';

// wordInfo: key, text
export function generateBoard(words) {
  // calculate board size
  // init empty board
  // fill all the words from longest one
  // fill random chars to empty cells
  // return
  if (!words || words.length === 0) return [];
  // console.log('generate board');

  words.sort((a, b) => b.text.length - a.text.length);
  const ADDITIONAL_CELL = 1;
  const MIN_SIZE = 5;
  const size = words[0].text.length + ADDITIONAL_CELL;
  const board = initBoard(Math.max(size, MIN_SIZE));
  // console.log({ data: originalWords, words, size });

  const renderFailed = [];
  words
    // .filter(x => x)
    // .map(x => x.trim().toUpperCase())
    .forEach(word => {
      // use as the key of word in the word list
      // const index = originalWords.findIndex(x => x.trim().toUpperCase() === w);
      // console.log({ w, index, words });
      const success = tryToFillWordToBoard(board, word);
      if (!success) {
        renderFailed.push(word.key);
      }
    });

  fillRandomChar(board);

  return { board, renderFailed };
}

function createCell(char, position, wordKey) {
  // console.log({ char, position, wordKey });

  return {
    char,
    position,
    tags: [wordKey]
  };
}

function appendTagToCell(cell, wordKey) {
  // console.log({ cell, wordKey });

  return { ...cell, tags: [...cell.tags, wordKey] };
}

function initBoard(size) {
  const board = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(createCell('', { x: j, y: i }));
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

function tryToFillWordToBoard(board, word) {
  // random direction
  // random position
  // check if availability
  // try some times
  // return success or not
  const { text, key } = word;
  const MAX_TRY = 100;
  let count = 0;
  let direction;
  let position;
  const size = board.length;
  do {
    direction = pickRandomDirection();
    position = pickRandomPosition(size, text.length, direction);
    // if (count === 0) {
    //   console.log('count = 0 >>>', {
    //     board: JSON.stringify(board),
    //     word,
    //     direction,
    //     position,
    //     count
    //   });
    // } else {
    //   console.log({
    //     board: JSON.stringify(board),
    //     word,
    //     direction,
    //     position,
    //     count
    //   });
    // }
  } while (!isValid(board, text, direction, position) && ++count < MAX_TRY);

  if (count < MAX_TRY) {
    fillWordToBoard(board, word, direction, position);
    return true;
  } else {
    // Ignore this word
    console.log('ignore the word >>>', text);
    return false;
  }
}

function fillWordToBoard(board, word, direction, initPosition) {
  const { key, text } = word;
  for (let i = 0; i < text.length; i++) {
    const xcell = initPosition.x + i * direction.x;
    const ycell = initPosition.y + i * direction.y;
    const cell = board[xcell][ycell];
    if (cell.char) {
      appendTagToCell(cell, key);
    } else {
      board[xcell][ycell] = createCell(text[i], { x: xcell, y: ycell }, key);
    }
  }
}
