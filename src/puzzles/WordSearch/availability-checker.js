export function isValid(board, word, direction, initPosition) {
  // console.log({ board, word, direction, initPosition });

  for (let i = 0; i < word.length; i++) {
    const xcell = initPosition.x + i * direction.x;
    const ycell = initPosition.y + i * direction.y;
    const existingChar = board[xcell][ycell].char;
    if (existingChar !== '' && existingChar !== word[i]) {
      return false;
    }
  }

  return true;
}
