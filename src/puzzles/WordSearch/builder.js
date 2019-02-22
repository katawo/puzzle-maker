import { randomChar } from "../util";
import { pickRandomDirection, pickRandomPosition } from "./random-pick";
import { isValid } from "./avalabilityChecker";

export function generateBoard(words) {
  // calculate board size
  // init empty board
  // fill all the words from longest one
  // fill random chars to empty cells
  // return
  if (!words || words.length === 0) return [];
  console.log("generate board");

  words.sort((a, b) => a.length < b.length);
  const ADDITIONAL_CELL = 3;
  const size = words[0].length + ADDITIONAL_CELL;
  const board = initBoard(size);
  // console.log({ words, size });

  words
    .filter(x => x)
    .map(x => x.trim().toUpperCase())
    .forEach(w => {
      tryToFillWordToBoard(board, w);
    });

  fillRandomChar(board);

  return board;
}

function initBoard(size) {
  const board = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push("");
    }
    board.push(row);
  }

  return board;
}

function fillRandomChar(board) {
  board.forEach(row => {
    for (let i = 0; i < row.length; i++) {
      if (row[i] === "") {
        row[i] = randomChar();
      }
    }
  });
}

function tryToFillWordToBoard(board, word) {
  // random direction
  // random position
  // check if avalability
  // try some times
  // return sucess or not
  const MAX_TRY = 10;
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
    console.log("ignore the word >>>", word);

    return;
  }

  fillWordToBoard(board, word, direction, position);
}

function fillWordToBoard(board, word, direction, initPosition) {
  for (let i = 0; i < word.length; i++) {
    const xcell = initPosition.x + i * direction.x;
    const ycell = initPosition.y + i * direction.y;
    board[xcell][ycell] = word[i];
  }
}
