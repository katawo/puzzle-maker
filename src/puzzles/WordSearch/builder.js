import { getRndInteger, randomChar } from "../util";

export function generateBoard(words) {
  if (!words || words.length === 0) return [];
  console.log("generate board");

  words.sort((a, b) => a.length < b.length);

  const size = words[0].length + 3;
  const board = initBoard(size);
  //   console.log({ words, size });

  words
    .filter(x => x)
    .forEach(w => {
      const MAX_TRY = 10;
      let count = 0;
      let direction;
      let position;
      let rest;
      do {
        direction = randomDirection();
        position = randomPosition(size - 1, w.length);
        rest = randomPosition(size - 1, 0);
        console.log({ count, direction, position, rest, w });
      } while (
        !isValid(board, direction, position, rest, w) &&
        ++count < MAX_TRY
      );

      if (count >= MAX_TRY) {
        // Ignore this word
        console.log("ignore the word >>>", w);

        return;
      }

      w.split("").forEach(c => {
        if (direction === 0) {
          // Horizontally
          board[position++][rest] = c.toUpperCase();
        } else {
          // Vertically
          board[rest][position++] = c.toUpperCase();
        }
      });
    });

  fillRandomChar(board);

  return board;
}

function isValid(board, direction, position, rest, word) {
  let valid = true;
  if (direction === 0) {
    // Horizontally
    for (let i = 0; i < word.length; i++) {
      console.log({ position });
      const existingChar = board[position++][rest];
      if (existingChar !== "" && existingChar !== word[i]) {
        valid = false;
        break;
      }
    }
  } else {
    // Vertically
    for (let i = 0; i < word.length; i++) {
      const existingChar = board[rest][position++];
      if (existingChar !== "" && existingChar !== word[i]) {
        valid = false;
        break;
      }
    }
  }

  return valid;
  // return true;
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

function randomDirection() {
  return getRndInteger(0, 1);
}

function randomPosition(size, length) {
  return getRndInteger(0, size - length);
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
