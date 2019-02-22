export function isValid(board, word, direction, initPosition) {
  // console.log({ board, word, direction, initPosition });

  for (let i = 0; i < word.length; i++) {
    const xcell = initPosition.x + i * direction.x;
    const ycell = initPosition.y + i * direction.y;
    const existingCell = board[xcell][ycell];
    if (existingCell !== "" && existingCell !== word[i]) {
      return false;
    }
  }

  return true;
}
