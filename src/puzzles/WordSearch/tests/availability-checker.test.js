import { isValid } from '../availability-checker';

describe('check position available', () => {
  test('should be a valid position', () => {
    const boardInJsonString =
      '[[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}]]';
    const board = JSON.parse(boardInJsonString);
    const word = 'ENTER';
    const direction = {
      x: -1,
      y: 1
    };
    const position = {
      x: 7,
      y: 0
    };

    const result = isValid(board, word, direction, position);
    expect(result).toBe(true);
  });

  test('should be an invalid position', () => {
    const boardInJsonString =
      '[[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"D","tags":[{"key":2,"checkSum":4}]},{"char":"R","tags":[{"key":0,"checkSum":5}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"E","tags":[{"key":0,"checkSum":5}]},{"char":"R","tags":[{"key":2,"checkSum":4}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"T","tags":[{"key":0,"checkSum":5}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"O","tags":[{"key":2,"checkSum":4}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"N","tags":[{"key":0,"checkSum":5}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"W","tags":[{"key":2,"checkSum":4}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}],[{"char":"E","tags":[{"key":0,"checkSum":5}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]},{"char":"","tags":[{"key":-1,"checkSum":0}]}]]';
    const board = JSON.parse(boardInJsonString);
    const word = 'LIST';
    const direction = {
      x: 1,
      y: 1
    };
    const position = {
      x: 1,
      y: 2
    };

    const result = isValid(board, word, direction, position);
    expect(result).toBe(false);
  });
});
