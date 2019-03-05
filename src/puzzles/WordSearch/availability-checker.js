export function isValid(board, wordText, direction, initPosition) {
  // console.log({ board, word: wordText, direction, initPosition });

  for (let i = 0; i < wordText.length; i++) {
    const xcell = initPosition.x + i * direction.x;
    const ycell = initPosition.y + i * direction.y;
    const existingChar = board[xcell][ycell].char;
    if (existingChar !== '' && existingChar !== wordText[i]) {
      return false;
    }
  }

  return true;
}
